import {
    CUDResponse,
    DBCartClass,
    ICartProduct,
    IMongoProduct,
    INew_Product,
    IProduct,
} from '../../../models/products.interface';
import { connect, Model} from 'mongoose';
import { models, atlasURI, mongoURI } from './models';

export class MongoCart implements DBCartClass {
    private cart: Model<ICartProduct>;
    private uri: string;
    constructor(type: string) {
        this.cart = models.cart;
        if (type === 'Atlas') {
            this.uri = atlasURI;
        } else {
            this.uri = mongoURI;
        }
        this.init();
    }
    async init(): Promise<void> {
        await connect(this.uri);
        console.log(`Mongo Connected`);
        await this.cart.deleteMany({});
    }
    async get(id?: string | undefined): Promise<ICartProduct[] | []> {
        if (id != null) {
            const product: ICartProduct[] | [] = await this.cart.find({
                _id: id,
            });
            if (product.length > 0) return product;
            return [];
        } else {
            const product: ICartProduct[] | [] = await this.cart.find({});
            if (product.length > 0) return product;
            return [];
        }
    }
    async add(id: string, product: INew_Product): Promise<CUDResponse> {
        console.log(product)
        const cartProduct = { product_id: id, product};
        await this.cart.create(cartProduct);
        return {
            message: `Product successfully added.`,
            data: { _id: id, ...product },
        };
    }
    async delete(id: string): Promise<CUDResponse> {
        const deleted: ICartProduct[] | [] = await this.get(id);
        const { product_id, ...rest } = deleted[0];
        const product: IMongoProduct = { _id: product_id.toString(), ...rest };
        const result = await this.cart.deleteOne({ _id: id });
        console.log(result);
        return {
            message: `Product successfully deleted.`,
            data: product,
        };
    }
}
//{ useNewUrlParser: true, useUnifiedTopology: true };

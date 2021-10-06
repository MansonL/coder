import {
    CUDResponse,
    DBCartClass,
    ICartProduct,
    IMongoProduct,
    IMongoCartProduct,
    INew_Product,
} from '../../../models/products.interface';
import { connect, Model } from 'mongoose';
import { models, atlasURI, mongoURI } from './models';
import { utils } from '../../../utils/utils';

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
    async get(id?: string | undefined): Promise<IMongoCartProduct[] | []> {
        if (id != null) {
            const doc = await this.cart.find({
                product_id: id,
            });
            if (doc.length > 0) {
                const products: IMongoCartProduct[] =
                    utils.extractMongoCartDocs(doc);
                return products;
            } else {
                return [];
            }
        } else {
            const doc = await this.cart.find({ product_id: id });
            if (doc.length > 0) {
                const products: IMongoCartProduct[] =
                    utils.extractMongoCartDocs(doc);
                return products;
            } else {
                return [];
            }
        }
    }
    async add(id: string, product: INew_Product): Promise<CUDResponse> {
        const cartProduct = { product_id: id, ...product };
        await this.cart.create(cartProduct);
        return {
            message: `Product successfully added.`,
            data: { _id: id, ...product },
        };
    }
    async delete(id: string): Promise<CUDResponse> {
        const deleted: IMongoCartProduct = (await this.get(id))[0];
        const result = await this.cart.deleteOne({ product_id: id });
        console.log(result);
        return {
            message: `Product successfully deleted.`,
            data: deleted,
        };
    }
}


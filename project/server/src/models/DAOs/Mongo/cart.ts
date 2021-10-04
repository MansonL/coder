import {
    CUDResponse,
    DBCartClass,
    ICartProduct,
    INew_Product,
    IProduct,
} from '../../../models/products.interface';
import { connect, Model, Query, Document } from 'mongoose';
import { models } from './models';

const atlasURI = `mongodb+srv://${process.env.DB_ATLAS_USER}:${process.env.DB_ATLAS_PASS}@project.lofof.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const mongoURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:27018/${process.env.DB_NAME}`;

class Cart implements DBCartClass {
    private products: Model<INew_Product>;
    private cart: Model<ICartProduct>;
    private uri: string;
    constructor(type: string) {
        this.products = models.products;
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
    async add(product: IProduct): Promise<CUDResponse> {
        
    }
    async delete(id: string): Promise<CUDResponse> {}
}
//{ useNewUrlParser: true, useUnifiedTopology: true };

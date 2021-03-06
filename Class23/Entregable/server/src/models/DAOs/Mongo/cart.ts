import { connect, Model } from 'mongoose';
import { Utils } from '../../../common/utils';
import {
    CUDResponse,
    DBCartClass,
    ICartProduct,
    IMongoCartProduct,
    INew_Product,
} from '../../../interfaces/interfaces';
import { models } from './models';

export class MongoCart implements DBCartClass {
    private cart: Model<ICartProduct>;
    constructor(type: string) {
        this.cart = models.cart;
        this.init();
    }
    async init(): Promise<void> {
        await this.cart.deleteMany({});
        console.log(`Cart cleaned`);
    }
    async get(id?: string | undefined): Promise<IMongoCartProduct[] | []> {
        if (id != null) {
            const doc = await this.cart.find({
                product_id: id,
            });
            console.log(doc);
            if (doc.length > 0) {
                const products: IMongoCartProduct[] =
                    Utils.extractMongoCartDocs(doc);
                return products;
            } else {
                return [];
            }
        } else {
            const doc = await this.cart.find({});
            if (doc.length > 0) {
                const products: IMongoCartProduct[] =
                    Utils.extractMongoCartDocs(doc);
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
        return {
            message: `Product successfully deleted.`,
            data: deleted,
        };
    }
}

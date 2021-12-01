import { connect, Model } from 'mongoose';
import { EProductsErrors } from '../../../common/EErrors';
import { Utils } from '../../../common/utils';
import {
    CUDResponse,
    DBCartClass,
    ICartProduct,
    IMongoCartProduct,
    INew_Product,
    InternalError,
} from '../../../interfaces/interfaces';
import { ApiError } from '../../../utils/errorApi';
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
    async get(id?: string | undefined): Promise<IMongoCartProduct[] | ApiError | InternalError> {
        try {
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
                    return ApiError.notFound(EProductsErrors.ProductNotFound)
                }
            } else {
                const doc = await this.cart.find({});
                if (doc.length > 0) {
                    const products: IMongoCartProduct[] =
                        Utils.extractMongoCartDocs(doc);
                    return products;
                } else {
                    return ApiError.notFound(EProductsErrors.ProductNotFound)
                }
            }
        } catch (error) {
            return {
                error: error,
                message: error.message as string, 
            }
        }
        
    }
    async add(id: string, product: INew_Product): Promise<CUDResponse | ApiError> {
        try {
            const cartProduct = { product_id: id, ...product };
            await this.cart.create(cartProduct);
            return {
                message: `Product successfully added.`,
                data: { _id: id, ...product },
            };
        } catch (error) {
            return {
                error: error,
                message: error.message as string,
            }
        }
        
    }
    async delete(id: string): Promise<CUDResponse | ApiError> {
        try {
            const deleted: IMongoCartProduct = (await this.get(id))[0];
            const result = await this.cart.deleteOne({ product_id: id });
            return {
                message: `Product successfully deleted.`,
                data: deleted,
            };
        } catch (error) {
            return {
                error: error,
                message: error.message as string,
            }
        }
        
    }
}

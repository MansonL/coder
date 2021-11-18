import {
    CUDResponse,
    IMongoCartProduct,
    INew_Product,
} from '../interfaces/interfaces';
import { CartFactory } from '../models/cartFactory';
import { MongoCart } from '../models/DAOs/Mongo/cart';
import { storage } from './products';

/**
 *
 * ApiProducts Class: here we are receiving the type of storage
 * & connecting with the product controller
 *
 */
class CartApi {
    private products: MongoCart; // Ir cambiando tipo de clase cuando se agreguen más persistencias
    constructor() {
        this.products = CartFactory.get(storage);
    }
    async getProduct(
        id?: string | undefined
    ): Promise<IMongoCartProduct[] | []> {
        if (id != null) {
            const product: IMongoCartProduct[] | [] = await this.products.get(
                id
            );
            return product;
        } else {
            const product: IMongoCartProduct[] | [] = await this.products.get();
            return product;
        }
    }
    async addProduct(id: string, product: INew_Product): Promise<CUDResponse> {
        const result = await this.products.add(id, product);
        return result;
    }
    async deleteProduct(id: string): Promise<CUDResponse> {
        const result = await this.products.delete(id);
        return result;
    }
}
export const cartApi = new CartApi();

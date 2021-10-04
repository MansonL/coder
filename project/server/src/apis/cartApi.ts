import { storage } from '.';
import {
    CUDResponse,
    ICartProduct,
    IProduct,
} from '../models/products.interface';
import { FSCart } from '../models/DAOs/FS/cart';
import { CartFactory } from '../models/cart.factory';
import { SQLCart } from '../models/DAOs/SQL/MySQL/cart';
/**
 *
 * ApiProducts Class: here we are receiving the type of storage
 * & connecting with the product controller
 *
 */
class CartApi {
    private products: FSCart | SQLCart; // Ir cambiando tipo de clase cuando se agreguen más persistencias
    constructor() {
        this.products = CartFactory.get(storage);
    }
    async getProduct(id?: string | undefined): Promise<ICartProduct[] | []> {
        if (id != null) {
            const product: ICartProduct[] | [] = await this.products.get(id);
            return product;
        } else {
            const product: ICartProduct[] | [] = await this.products.get();
            return product;
        }
    }
    async addProduct(product: IProduct): Promise<CUDResponse> {
        const result = await this.products.add(product);
        return result;
    }
    async deleteProduct(id: string): Promise<CUDResponse> {
        const result = await this.products.delete(id);
        return result;
    }
}
export const cartApi = new CartApi();

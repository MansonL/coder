import { storage } from '.';
import { ProductsFactory } from '../models/products.factory';
import { CUDResponse, IProduct } from '../models/products.interface';
import { FSCart } from '../models/DAOs/FS/cart';
/**
 *
 * ApiProducts Class: here we are receiving the type of storage
 * & connecting with the product controller
 *
 */
class CartApi {
    private products: FSCart; // Ir cambiando tipo de clase cuando se agreguen más persistencias
    constructor() {
        this.products = ProductsFactory.get(storage);
    }
    async getProduct(id?: string | undefined): Promise<IProduct[] | []> {
        if (id != null) {
            const product: IProduct[] | [] = await this.products.get(id);
            return product;
        } else {
            const product: IProduct[] | [] = await this.products.get();
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

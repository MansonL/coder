import { FSProducts } from '../models/DAOs/FS/products';
import { ProductsFactory } from '../models/products.factory';
import {
    INew_Product,
    CUDResponse,
    IProduct,
    IQueryOrUpdate,
} from '../models/products.interface';
import { storage } from '.';

/**
 *
 * ApiProducts Class: here we are receiving the type of storage
 * & connecting with the product controller
 *
 */
class ProductsApi {
    private products: FSProducts; // Ir cambiando tipo de clase cuando se agreguen más persistencias
    constructor() {
        this.products = ProductsFactory.get(storage);
    }
    async getProduct(id?: string | undefined): Promise<IProduct[] | []> {
        if (id != null) {
            const result = await this.products.get(id);
            return result;
        } else {
            const result = await this.products.get();
            return result;
        }
    }
    async addProduct(product: INew_Product): Promise<CUDResponse> {
        const result = await this.products.add(product);
        return result;
    }
    async updateProduct(
        id: string,
        product: IQueryOrUpdate
    ): Promise<CUDResponse> {
        const result = await this.products.update(id, product);
        return result;
    }
    async deleteProduct(id: string): Promise<CUDResponse> {
        const result = await this.products.delete(id);
    }
    async query(options: IQueryOrUpdate): Promise<IProduct[] | []> {}
}

export const productsApi = new ProductsApi();
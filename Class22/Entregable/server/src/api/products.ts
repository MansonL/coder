import { MemoryType, ProductsFactory } from '../models/productsFactory';
import {
    INew_Product,
    CUDResponse,
    IUpdate,
    IMongoProduct,
} from '../interfaces/interfaces';
import { MongoProducts } from '../models/DAOs/Mongo/products';

/**
 *
 * ApiProducts Class: here we are receiving the type of storage
 * & connecting with the product controller
 *
 */
export const storage = MemoryType.MongoAtlas;

export class ProductsApi {
    private products: MongoProducts;
    constructor() {
        this.products = ProductsFactory.get(storage);
    }
    async getProduct(id?: string | undefined): Promise<IMongoProduct[] | []> {
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
    async updateProduct(id: string, product: IUpdate): Promise<CUDResponse> {
        const result = await this.products.update(id, product);
        return result;
    }
    async deleteProduct(id: string): Promise<CUDResponse> {
        const result = await this.products.delete(id);
        return result;
    }
    /*
        async query(options: IQuery): Promise<IProduct[] | IMongoProduct[] | []> {
        const result = await this.products.query(options);
        return result;
    }
    */
}

export const productsApi = new ProductsApi();

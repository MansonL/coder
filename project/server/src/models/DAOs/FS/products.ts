import path from 'path';
import { utils } from '../../../utils/utils';
import {
    CUDResponse,
    DBProductsClass,
    INew_Product,
    IUpdate,
    IQuery,
} from '../../../models/products.interface';
import { IProduct } from '../../../models/products.interface';

export const productsFile: string = path.resolve(__dirname, '../../products.json');

export class FSProducts implements DBProductsClass {
    async get(id?: string | undefined): Promise<IProduct[] | []> {
        const products: IProduct[] | [] = await utils.readFS(productsFile);
        if (id != null) {
            const product: IProduct | undefined = products.find(
                (product) => product.id == id
            );
            if (product) return [product];
            return [];
        } else {
            return products;
        }
    }
    async add(newProduct: INew_Product): Promise<CUDResponse> {
        const products: IProduct[] = await utils.readFS(productsFile);
        const product: IProduct = {
            ...newProduct,
            id: utils.generateID(),
        };
        products.push(product);
        await utils.writeFS(products, productsFile);
        return { message: `Product added successfully.`, data: product };
    }
    async update(id: string, data: IUpdate): Promise<CUDResponse> {
        const products: IProduct[] | [] = await this.get();
        const product: IProduct = products.find(
            (product) => product.id == id
        ) as IProduct;

        const productID: number = products.findIndex(
            (product) => product.id == id
        );
        const newProduct: IProduct = {
            ...product,
            ...data,
        };
        products[productID] = newProduct;
        await utils.writeFS(products, productsFile);
        return {
            message: `Product updated successfully.`,
            data: newProduct,
        };
    }
    async delete(id: string): Promise<CUDResponse> {
        const products: IProduct[] | [] = await this.get();
        const deletedID: number = products.findIndex(
            (product) => product.id == id
        );
        const deleted: IProduct = products.splice(deletedID, 1)[0];
        await utils.writeFS(products, productsFile);
        return { message: `Product deleted successfully.`, data: deleted };
    }
    async query(options: IQuery): Promise<IProduct[] | []> {
        const products: IProduct[] | [] = await this.get();
        const titleRegex = new RegExp(`${options.title}`);
        const codeRegex = new RegExp(`${options.code}`);
        const results: IProduct[] | [] = products.filter(
            (product) =>
                titleRegex.test(product.title) &&
                codeRegex.test(product.code) &&
                product.price >= options.price.minPrice &&
                product.price <= options.price.maxPrice &&
                product.stock >= options.stock.minStock &&
                product.stock <= options.stock.maxStock
        );
        if (results) return results;
        return [];
    }
}

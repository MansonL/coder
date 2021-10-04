import { promises as fsPromises } from 'fs';
import path from 'path';
import {
    CUDResponse,
    DBCartClass,
    ICartProduct,
} from '../../../models/products.interface';
import { IProduct } from '../../../models/products.interface';
import { utils } from '../../../utils/utils';
import { mockProducts } from '../mockProducts';
import { productsPath } from './mockProducts';
import { addingProperties } from './mockProducts';

export const cartFile = path.resolve(__dirname, '../../cart.json');
export class FSCart implements DBCartClass {
    async get(id?: string | undefined): Promise<ICartProduct[] | []> {
        const products: ICartProduct[] = (await utils.readFS(cartFile)) as
            | ICartProduct[]
            | [];
        if (id != null) {
            const product: ICartProduct | undefined = products.find(
                (product) => product.product_id == id
            );
            if (product) return [product];
            return [];
        } else {
            return products;
        }
        this.init();
    }
    async init(): Promise<void> {
        let FSProducts: IProduct[] = utils.mockDataForFS(mockProducts);
        FSProducts = addingProperties(FSProducts);
        await utils.writeFS(FSProducts, productsPath);
    }
    async add(product: IProduct): Promise<CUDResponse> {
        const products: ICartProduct[] = (await utils.readFS(cartFile)) as
            | ICartProduct[]
            | [];
        const { id, ...restOfProduct } = product;
        const cartProduct = { product_id: id, ...restOfProduct };
        products.push(cartProduct);
        await utils.writeFS(products, cartFile);
        return { message: `Product successfully saved.`, data: product };
    }
    async delete(id: string): Promise<CUDResponse> {
        const products: ICartProduct[] = (await utils.readFS(cartFile)) as
            | ICartProduct[]
            | [];
        const deletedID: number = products.findIndex(
            (product) => product.product_id === id
        );
        const { product_id, ...restOfProduct } = products.splice(
            deletedID,
            1
        )[0];
        const deleted: IProduct = { id: product_id, ...restOfProduct };
        await utils.writeFS(products, cartFile);
        return { message: `Product successfully deleted.`, data: deleted };
    }
}

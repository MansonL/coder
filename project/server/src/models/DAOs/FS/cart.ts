import { promises as fsPromises } from 'fs';
import path from 'path';
import { CUDResponse, DBCartClass } from '../../../models/products.interface';
import { IProduct } from '../../../models/products.interface';
import { utils } from '../../../utils/utils';

const cartFile = path.resolve(__dirname, '../../cart.json');

export class FSCart implements DBCartClass {
    async get(id?: string | undefined): Promise<IProduct[] | []> {
        const products: IProduct[] | [] = await utils.readFS(cartFile);
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
    async add(product: IProduct): Promise<CUDResponse> {
        const products: IProduct[] = await utils.readFS(cartFile);
        products.push(product);
        await utils.writeFS(products, cartFile);
        return { message: `Product successfully saved.`, data: product };
    }
    async delete(id: string): Promise<CUDResponse> {
        const products: IProduct[] = await utils.readFS(cartFile);
        const deletedID: number = products.findIndex(
            (product) => product.id === id
        );
        const deleted: IProduct = products.splice(deletedID, 1)[0];
        return { message: `Product successfully deleted.`, data: deleted };
    }
}

import { promises as fsPromises } from 'fs';
import path from 'path';
import {
    CUDResponse,
    DBCartClass,
    ICartProduct,
    INew_Product,
} from '../../../models/products.interface';
import { IProduct } from '../../../models/products.interface';
import { utils } from '../../../utils/utils';


export const cartFile = path.resolve(__dirname, '../../cart.json');
export class FSCart implements DBCartClass {
    constructor(){
        this.init();
    }
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
    }
    async init () : Promise<void> {
        await utils.cleanCartFS();
    }
    async add(id: string, product: INew_Product): Promise<CUDResponse> {
        const products: ICartProduct[] = (await utils.readFS(cartFile)) as
            | ICartProduct[]
            | [];
        const cartProduct = { product_id: id, ...product };
        products.push(cartProduct);
        await utils.writeFS(products, cartFile);
        return {
            message: `Product successfully saved.`,
            data: { id: id, ...product },
        };
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

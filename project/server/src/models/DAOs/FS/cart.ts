import { promises as fsPromises } from 'fs';
import path from 'path';
import { CUDResponse, DBCartClass } from '../../../models/products.interface';
import { IProduct } from '../../../models/products.interface';

const cartFile = path.resolve(__dirname, '../../cart.json');

export class FSCart implements DBCartClass {
    async get(id?: string | undefined): Promise<IProduct[] | []> {}
    async add(product: IProduct): Promise<CUDResponse> {}
    async delete(id: string): Promise<CUDResponse> {}
}

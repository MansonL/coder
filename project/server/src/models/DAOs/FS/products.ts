import { promises as fsPromises } from 'fs';
import path from 'path';
import {
    CUDResponse,
    DBProductsClass,
    INew_Product,
    IQueryOrUpdate,
} from '../../../models/products.interface';
import { IProduct } from '../../../models/products.interface';

const productsFile: string = path.resolve(__dirname);

export class FSProducts implements DBProductsClass {
    async get(id?: string | undefined): Promise<IProduct[] | []> {}
    async add(product: INew_Product): Promise<CUDResponse> {}
    async update(id: string, data: IQueryOrUpdate): Promise<CUDResponse> {}
    async delete(id: string): Promise<CUDResponse> {}
    async query(options: IQueryOrUpdate): Promise<IProduct[]> {}
}

import { readFile, writeFile } from 'fs/promises';
import { v4 as uuid } from 'uuid';
import { INew_Product, IProduct, IQuery } from '../models/products.interface';
import { productsFile } from '../models/DAOs/FS/products';

class Utils {
    /**
     * Product code different than DB id.
     * @returns code
     */

    generateCode = (): string => {
        return `_${Math.random().toString(36).substr(2, 9)}`;
    };

    /**
     * Just for FS storage where id isn't being generated automatically
     *
     * @returns ID
     */

    generateID = (): string => {
        return uuid();
    };

    /**
     *
     * @param products: DB Product type
     * @param id: string
     * @returns: the product if it's found or undefined if it's not found
     */

    findProduct = (products: IProduct[], id: string): IProduct | undefined => {
        return products.find((product: IProduct): boolean => product.id === id);
    };

    /**
     * Just for FS Storage
     *
     * @param file: file where the products array is stored
     * @returns: whether the product exists or not
     *
     */

    productsExist = (file: string) => {
        const data: string | [] | IProduct[] = JSON.parse(file);
        if (data === '' || data.length === 0) {
            return false;
        } else {
            return true;
        }
    };

    /**
     *
     * Read JSON files from FS and returning a JS Object.
     *
     */
    readFS = async (filePath: string): Promise<IProduct[]> => {
        const stringFile = await readFile(filePath, 'utf-8');
        if (stringFile == '') return [];
        const product: IProduct[] | [] = JSON.parse(stringFile);
        return product;
    };

    /**
     *
     * Stringify JS Objects and write to JSON.
     *
     */
    writeFS = async (product: IProduct[], filePath: string) => {
        const result = await writeFile(
            filePath,
            JSON.stringify(product, null, `\t`)
        );
    };

    getMaxStockPrice = async (type: string): Promise<number> => {
        const products = await this.readFS(productsFile);
        if (type === 'price') {
            const prices = products.map((product) => product.price);
            return Math.max(...prices);
        } else {
            const stocks = products.map((product) => product.stock);
            return Math.max(...stocks);
        }
    };
    /**
     *
     * Method for queries. Filtering the array data coming from the database with specific values from the front.
     *
     */
    query = (products: IProduct[], options: IQuery): IProduct[] | [] => {
        const titleRegex =
            options.title === ''
                ? new RegExp(`.*`)
                : new RegExp(`(${options.title})`);
        const codeRegex =
            options.code === ''
                ? new RegExp(`.*`)
                : new RegExp(`(${options.code})`);
        const results: IProduct[] | [] = products.filter(
            (product) =>
                titleRegex.test(product.title) &&
                codeRegex.test(product.code) &&
                product.price >= options.price.minPrice &&
                product.price <= options.price.maxPrice &&
                product.stock >= options.stock.minStock &&
                product.stock <= options.stock.maxStock
        );
        return results;
    };
    mockDataForFS = (mockData: INew_Product[]): IProduct[] => {
        return mockData.map((product) => {
            const FSProduct = { id: '', ...product };
            return FSProduct;
        });
    };
}

export const utils = new Utils();

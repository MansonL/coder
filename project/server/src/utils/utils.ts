import { readFile, writeFile } from 'fs/promises';
import { v4 as uuid } from 'uuid';
import {
    ICartProduct,
    IMongoCartProduct,
    IMongoProduct,
    INew_Product,
    IProduct,
    IQuery,
} from '../models/products.interface';
import { productsFile } from '../models/DAOs/FS/products';
import { cartFile } from '../models/DAOs/FS/cart';
import { any } from 'joi';

class Utils {
    /**
     * Product code different than DB id.
     * @returns String code.
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
    readFS = async (filePath: string): Promise<IProduct[] | ICartProduct[]> => {
        const stringFile = await readFile(filePath, 'utf-8');
        if (stringFile == '') return [];
        if (filePath === cartFile) {
            const product: ICartProduct[] | [] = JSON.parse(stringFile);
            return product;
        } else {
            const product: IProduct[] | [] = JSON.parse(stringFile);
            return product;
        }
    };

    /**
     *
     * Stringify JS Objects and write to JSON.
     *
     */
    writeFS = async (
        product: IProduct[] | ICartProduct[],
        filePath: string
    ) => {
        const result = await writeFile(
            filePath,
            JSON.stringify(product, null, `\t`)
        );
    };

    /**
     *
     * Cleaning FS Cart.
     *
     */
    cleanCartFS = async (): Promise<void> => {
        await writeFile(cartFile, '');
        console.log(`Cart cleaned.`);
    };

    /**
     *
     * @param type: string
     *
     * @returns : Max price or stock of products.
     */
    getMaxStockPrice = async (
        products: IMongoProduct[] | IProduct[],
        type: string
    ): Promise<number> => {
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
    isMongo = (product: any): product is IMongoProduct => {
        return '_id' in product;
    };
    isSQL = (product: any): product is IProduct => {
        return 'id' in product;
    };
    extractMongoDocs = (documents: any): IMongoProduct[] => {
        const products: IMongoProduct[] = documents.map(
            (document: any): IMongoProduct => {
                const {
                    _id,
                    timestamp,
                    title,
                    description,
                    code,
                    img,
                    stock,
                    price,
                } = document;
                const product: IMongoProduct = {
                    _id,
                    timestamp,
                    title,
                    description,
                    code,
                    img,
                    stock,
                    price,
                };
                return product;
            }
        );
        return products;
    };
    extractMongoCartDocs = (documents: any): IMongoCartProduct[] => {
        const productsIds = documents.map((document: any) => {
            const { product_id } = document;
            return product_id;
        });
        const products: IMongoProduct[] = this.extractMongoDocs(documents);
        const cartProducts: IMongoCartProduct[] = products.map(
            (product: IMongoProduct, idx: number) => {
                return { product_id: productsIds[idx], ...product };
            }
        );
        return cartProducts;
    };
}

export const utils = new Utils();

import { readFile, writeFile } from 'fs/promises';
import { v4 as uuid } from 'uuid';
import { IProduct } from '../models/products.interface';

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
        const product: IProduct[] | [] | '' = JSON.parse(stringFile);
        if (product == '') return [];
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
}

export const utils = new Utils();

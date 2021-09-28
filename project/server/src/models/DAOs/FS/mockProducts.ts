import path from 'path';
import moment from 'moment';
import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { utils } from '../../../utils/utils';
import { mockProducts } from '../mockProducts';
import { IProduct } from '../../products.interface';

const randomNumber = (type: string): number => {
    if (type === 'price') {
        return Number(
            (Math.random() * (5000.0 - 100.0 + 1) + 100.0).toFixed(2)
        );
    } else {
        return Number((Math.random() * (1000 - 0 + 1) + 0).toFixed(0));
    }
};
const productsPath = path.resolve(__dirname + '../../../products.json');
const addingProperties = (mockProducts: IProduct[]): void => {
    mockProducts.forEach((product: IProduct) => {
        product.id = utils.generateID();
        product.timestamp = moment().format('LLL');
        product.code = uuidv4();
        product.price = randomNumber('price');
        product.stock = randomNumber('stock');
    });
};

export const createMockProducts = async (): Promise<void> => {
    addingProperties(mockProducts);
    await writeFile(productsPath, JSON.stringify(mockProducts, null, '\t'));
};

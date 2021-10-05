import path from 'path';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { utils } from '../../../utils/utils';
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
export const productsPath = path.resolve(__dirname + '../../../products.json');
export const addingProperties = (mockProducts: IProduct[]): IProduct[] => {
    mockProducts.forEach((product: IProduct) => {
        product.id = utils.generateID();
        product.timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        product.code = uuidv4();
        product.price = randomNumber('price');
        product.stock = randomNumber('stock');
    });
    return mockProducts;
};

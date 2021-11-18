import {
    IMongoProduct,
    IMongoMessage,
    IMongoUser,
    IMongoCartProduct,
    IQuery,
    INew_Product,
} from '../interfaces/interfaces';
import faker from 'faker';
import moment from 'moment';
import { randomNumber } from '../models/mockProducts';

class Utils {
    
    /**
     *
     * @param type: string
     *
     * @returns : Max price or stock of products.
     */
     getMaxStockPrice = async (
        products: IMongoProduct[] ,
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
     * Product code different than DB id.
     * @returns String code.
     */

    generateCode = (): string => {
        return `_${Math.random().toString(36).substr(2, 9)}`;
    };

    /**
     * Functions for extracting the needed data from the queried docs from MongoDB
     * @param documents 
     * 
     * @returns 
     */
    extractMongoProducts = (documents: any): IMongoProduct[] => {
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
    extractMongoMessages = (documents: any): IMongoMessage[] => {
        const messages: IMongoMessage[] = documents.map(
            (document: any): IMongoMessage => {
                const { _id, timestamp, author, message } = document;
                const mongoMessage: IMongoMessage = {
                    _id,
                    timestamp,
                    author,
                    message,
                };
                return mongoMessage;
            }
        );
        return messages;
    };
    extractMongoUsers = (documents: any): IMongoUser[] => {
        const users: IMongoUser[] = documents.map(
            (document: any): IMongoUser => {
                const { _id, timestamp, user, name, surname, age, alias, avatar } = document;
                const mongoUser: IMongoUser = {
                    _id,
                    timestamp,
                    user,
                    name, 
                    surname,
                    age,
                    alias,
                    avatar
                };
                return mongoUser;
            }
        );
        return users;
    };
    extractMongoCartDocs = (documents: any): IMongoCartProduct[] => {
        const productsIds = documents.map((document: any) => {
            const { product_id } = document;
            return product_id;
        });
        const products: IMongoProduct[] = this.extractMongoProducts(documents);
        const cartProducts: IMongoCartProduct[] = products.map(
            (product: IMongoProduct, idx: number) => {
                return { product_id: productsIds[idx], ...product };
            }
        );
        return cartProducts;
    };
    
    generateRandomProducts = (qty: number): IMongoProduct[] => {
        const randomProducts = [];
        for (let i = 0; i < qty; i++) {
            const randomProduct : IMongoProduct = {
                _id: utils.generateCode(), // This line is just for not changing the frontend and simulating a real product from MongoDB
                timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                img: faker.image.imageUrl(),
                code: utils.generateCode(),
                price: Number(faker.commerce.price(0.01)),
                stock: randomNumber('stock')
            };
            randomProducts.push(randomProduct);
        }
        return randomProducts
    }
}

export const utils = new Utils();

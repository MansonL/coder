import { IMongoProduct, IMongoMessage, IMongoUser } from '../interfaces/interfaces';

class Utils {
    /**
     * Product code different than DB id.
     * @returns String code.
     */

    generateCode = (): string => {
        return `_${Math.random().toString(36).substr(2, 9)}`;
    };

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
                const { _id, timestamp, user, message } = document;
                const mongoMessage: IMongoMessage = {
                    _id,
                    timestamp,
                    user,
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
                const { _id, timestamp, user } = document;
                const mongoUser : IMongoUser = {
                    _id,
                    timestamp,
                    user
                }
                return mongoUser
            }
        )
        return users
    }
}

export const utils = new Utils();

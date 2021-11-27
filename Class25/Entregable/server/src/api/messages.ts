import {
    IMongoMessage,
    CUDResponse,
    INew_Message,
} from '../interfaces/interfaces';
import { storage } from './products';
import { MongoMessages } from '../models/DAOs/Mongo/messages';
import { MessagesFactory } from '../models/messagesFactory';

export class MessagesApi {
    private messages: MongoMessages;
    constructor() {
        this.messages = MessagesFactory.get(storage);
    }
    async getMsg(): Promise<IMongoMessage[] | []> {
        const result = await this.messages.get();
        return result;
    }
    async addMsg(message: INew_Message): Promise<CUDResponse> {
        const result = await this.messages.add(message);
        return result;
    }
}

export const messagesApi = new MessagesApi();

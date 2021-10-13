import {
    IMongoMessage,
    CUDResponse,
    INew_Message,
} from '../interfaces/interfaces';
import { storage } from './products';
import { MongoMessages } from '../models/DAOs/Mongo/messages';
import { MessageFactory } from '../models/messagesFactory';

class MessagesApi {
    private messages: MongoMessages;
    constructor() {
        this.messages = MessageFactory.get(storage);
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

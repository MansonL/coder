import {
    DBMessagesClass,
    IMongoMessage,
    INew_Message,
    CUDResponse,
    IMongoUser,
} from '../../../interfaces/interfaces';
import { models, WelcomeMessage } from './models';
import { Model, connect } from 'mongoose';
import { Utils } from '../../../common/utils';

export class MongoMessages implements DBMessagesClass {
    private messages: Model<INew_Message>;
    constructor(type: string) {
        this.messages = models.messages;
        this.init();
    }
    async init() {
        await this.messages.deleteMany({});
        await WelcomeMessage.save();
        console.log(`Messages initialized`);
    }
    async get(): Promise<IMongoMessage[] | []> {
        const docs = await this.messages.find({});
        if (docs.length > 0) {
            const messages: IMongoMessage[] = Utils.extractMongoMessages(docs);
            return messages;
        } else {
            return [];
        }
    }
    async add(msg: INew_Message): Promise<CUDResponse> {
        const doc = await this.messages.create(msg);
        const result = Utils.extractMongoMessages([doc])[0];
        return {
            message: `Message successfully added.`,
            data: result,
        };
    }
}

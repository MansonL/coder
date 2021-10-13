import {
    DBMessagesClass,
    IMongoMessage,
    INew_Message,
    CUDResponse,
} from '../../../interfaces/interfaces';
import { models, WelcomeMessage } from './models';
import { Model, connect } from 'mongoose';
import { atlasURI, mongoURI } from './models';
import { utils } from '../../../common/utils';

export class MongoMessages implements DBMessagesClass {
    private messages: Model<INew_Message>;
    private uri: string;
    constructor(type: string) {
        this.messages = models.messages;
        if (type === 'atlas') {
            this.uri = atlasURI;
        } else {
            this.uri = mongoURI;
        }
        this.init();
    }
    async init() {
        await connect(this.uri);
        console.log(`Mongo Connected`);
        await this.messages.deleteMany({});
        await WelcomeMessage.save();
    }
    async get(): Promise<IMongoMessage[] | []> {
        const docs = await this.messages.find({});
        if (docs.length > 0) {
            const messages: IMongoMessage[] = utils.extractMongoMessages(docs);
            return messages;
        } else {
            return [];
        }
    }
    async add(msg: INew_Message): Promise<CUDResponse> {
        const doc = await this.messages.create(msg);
        const result = utils.extractMongoMessages([doc])[0];
        return {
            message: `Message successfully added.`,
            data: result,
        };
    }
}

import { IMessage, IUser, models, welcomeBotMsg } from '../models';
import { Model, connect } from 'mongoose';

const username = 'mansonl_00';
const pwd = 'admin123';

class MongoDBaaS {
    messages: Model<IMessage>;
    users: Model<IUser>;
    uri: string;
    constructor() {
        this.messages = models.messages;
        this.users = models.users;
        this.uri = `mongodb+srv://${username}:${pwd}@20entregable.ugrtd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    }
    init = async () => {
        connect(this.uri);
        await this.users.deleteMany({});
        await this.messages.deleteMany({});
        await this.users.create({ user: 'WelcomeBot' });
        const WelcomeBotID = await this.users.find({ user: 'WelcomeBot' }, { _id: 1 });
        welcomeBotMsg.user_id = WelcomeBotID[0].id;
        await this.messages.create(welcomeBotMsg);
    };
    getMessages = async () => {
        try {
            const result = await this.messages.find({}).sort({ time: 1 });
            return result;
        } catch (error) {
            throw error;
        }
    };
    getUsers = async () => {
        try {
            const result = await this.users.find({});
            return result;
        } catch (error) {
            throw error;
        }
    };
    getUserId = async (email: string) => {
        try {
            const result = await this.users.find({ user: email }, { _id: 1 });
            return result[0].id;
        } catch (error) {
            throw error;
        }
    };
    saveUser = async (email: string) => {
        try {
            const exist = await this.users.find({ user: email });
            console.log(exist.length);
            if (exist.length > 0) return;
            const result = await this.users.create({ user: email });
            return result;
        } catch (error) {
            throw error;
        }
    };
    saveMessage = async (data: IMessage) => {
        try {
            console.log(data);
            const result = await this.messages.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    };
}

const MongoDBaaScontroller = new MongoDBaaS();

export default MongoDBaaScontroller;

import { IMessage, IUser, models } from '../models';
import { Model, connect } from 'mongoose';

class MongoDBaaS {
    messages: Model<IMessage>;
    users: Model<IUser>;
    constructor() {
        this.messages = models.messages;
        this.users = models.users;
        this.uri = 
    }
    init = async () => {
        connect()
    }
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
            console.log(result);
        } catch (error) {
            throw error;
        }
    };
    saveUser = async (email: string) => {
        try {
            const result = await new this.users({ user: email });
            return result;
        } catch (error) {
            throw error;
        }
    };
    saveMessage = async (data: IMessage) => {
        try {
            const result = await new this.messages(data);
            return result;
        } catch (error) {
            throw error;
        }
    };
}

const MongoDBaaScontroller = new MongoDBaaS();

export default MongoDBaaScontroller;

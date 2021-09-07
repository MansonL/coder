import { development, production } from '../../knexfile';
import knex, { Knex } from 'knex';
import { Message, User } from '../utils';

class DB {
    connection: Knex;
    constructor() {
        const env = process.env.NODE_ENV || 'development';
        console.log(`Setting ENV: ${env}`);
        const option = env === 'development' ? development : production;
        this.connection = knex(option);
    }
    getMessages = async () => {
        return await this.connection<Message>('messages');
    };
    getUsers = async () => {
        return await this.connection<User>('users');
    };
    getUserId = async (email: string) => {
        return await this.connection<User>('users').where({ email: email }).select('id');
    };
    saveUser = (email: string): User => {};
    saveMessage = (data: Message | User) /*: Message */ => {
        if (data.type === 'message') {
            return this.connection.table<Message>('messages').insert<Message>(data);
        } else {
            return this.connection.table<User>('users').insert<User>(data);
        }
    };
}

const dbController = new DB();

export default dbController;

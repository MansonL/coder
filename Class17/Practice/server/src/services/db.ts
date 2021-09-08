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
        try {
            return await this.connection<Message>('messages');
        } catch (error) {
            throw error
        }
    };
    getUsers = async () => {
        try {
            return await this.connection<User>('users');
        } catch (error) {
            throw error
        }
    };
    getUserId = async (email: string) => {
        try {
            const user = await this.connection<User>('users').select().where({ user: email }).first();
            if (user?.id) {
                return user?.id;
            } else {
                throw `Couldn't get the user id, probably it doesn't exist.`;
            }
        } catch (error) {
            throw error;
        }
    };
    saveUser = async (email: string): Promise<User> => {
        try {
            return await this.connection.table<User>('users').insert({ user: email });
        } catch (error) {
            throw error
        }
    };
    saveMessage = async (data: Message) /*Promise<Message>*/ => {
        try {
            console.log(data)
            const result = await this.connection.table<Message>('messsages').insert(data);
            console.log(result)
        } catch (error) {
            throw error
        }
    };
}

const dbController = new DB();

export default dbController;

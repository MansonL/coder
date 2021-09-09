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
            throw error;
        }
    };
    getUsers = async () => {
        try {
            return await this.connection<User>('users');
        } catch (error) {
            throw error;
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
    saveUser = async (email: string) => {
        try {
            const exist = await this.connection.select('user').from('users').where({user: email});
            if(exist.length > 0) return
            return await this.connection.table<User>('users').insert({ user: email });
        } catch (error) {
            throw error;
        }
    };
    saveMessage = async (data: Message) => {
        try {
            return await this.connection.table<Message>('messages').insert(data);
        } catch (error) {
            throw error;
        }
    };
    deleteMessage = async (id: number) => {
        try {
            return await this.connection.table<Message>('messages').where('id',id).del();
        } catch (error) {
            throw error
        }
    }
    deleteUser = async (id: number) => {
        try {
            return await this.connection.table<User>('users').where('id', id).del();
        } catch (error) {
            throw error
        }
    }
}

const dbController = new DB();

export default dbController;

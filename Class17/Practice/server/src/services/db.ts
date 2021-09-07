import { development, production } from '../../../knexfile';
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
        try {
            const user = await this.connection<User>('users').select().where({ email: email }).first();
            if (user?.id) {
                return user?.id;
            } else {
                throw `Couldn't get the user id, probably it doesn't exist.`
            }
        } catch (error) {
            throw error
            
        }
    };
    saveUser = async (email: string): Promise<User>=> {
        return await this.connection.table<User>('users').insert({email:email});
    };
    saveMessage = async (data: Message) : Promise<Message> => {
        return await this.connection.table<Message>('messsages').insert(data)
    };
}

const dbController = new DB();

export default dbController;

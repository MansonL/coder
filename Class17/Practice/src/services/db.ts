import { development, production } from "../../knexfile";
import knex, { Knex } from "knex";
import { Message, User } from "../utils";


class DB {
    connection: Knex;
    constructor() {
        const env = process.env.NODE_ENV || 'development';
        console.log(`Setting ENV: ${env}`);
        const option = env === 'development' ? development : production;
        this.connection = knex(option);
    }
  getMessages = () => {
     return this.connection('messages')
  }
  getUsers = () => {
    return this.connection('users');
  }
  saveMessage = (data: Message | User)/*: Message */ => {
    if(data.type === 'message'){
        return this.connection.table('messages').insert(data);
    }else{
       return this.connection.table('users').insert(data);
    }
  }
}

const dbController = new DB();

export default dbController
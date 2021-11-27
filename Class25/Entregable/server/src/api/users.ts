import { INew_User, CUDResponse, IMongoUser } from '../interfaces/interfaces';
import { storage } from './products';
import { UsersFactory } from '../models/usersFactory';
import { MongoUsers } from '../models/DAOs/Mongo/users';

export class UsersApi {
    private users: MongoUsers;
    constructor() {
        this.users = UsersFactory.get(storage);
    }
    async getUser(id: string): Promise<IMongoUser[] | []> {
        const result: IMongoUser[] | [] = await this.users.get(id);
        return result;
    }
    async getUsers(): Promise<IMongoUser[] | []> {
        const result: IMongoUser[] | [] = await this.users.get();
        return result;
    }
    async addUser(message: INew_User): Promise<CUDResponse> {
        const result: CUDResponse = await this.users.add(message);
        return result;
    }
}

export const usersApi = new UsersApi();

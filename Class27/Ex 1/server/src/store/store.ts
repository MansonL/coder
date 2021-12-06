import * as uuid from 'uuid';
import { ApiError } from '../api/errorApi';
import { IUser, InternalError, CUDResponse, INew_User } from '../interfaces/interfaces';

declare global {
    namespace Express {
        interface User extends IUser {}
    }
}

export class Store {

    private users: IUser[];
    
    constructor(){
        this.users = [];
    }

     findOne (username: string): IUser | InternalError | ApiError {
        try {
            const user = this.users.filter(user => user.username === username)[0];
            if(user){
                return user
            }else{
                return ApiError.notFound("User doesn't exist.")
            }
        } catch (error) {
            return {
                error: error,
                message: "Internal Error."
            }
        }
    }

    findByID (id: string): IUser | InternalError | ApiError {
        try {
            const user = this.users.filter(user => user._id === id)[0];
            if(user){
                return user
            }else{
                return ApiError.notFound("User doesn't exist")
            }
        } catch (error) {
            return {
                error: error,
                message: "Internal Error."
            }
        }
    }

    saveOne (newUser: INew_User | IUser): CUDResponse | InternalError {
        try {
            const user = {
                ...newUser,
                _id: uuid.v4(),
            }
            const length = this.users.push(user);
            return {
                data: this.users[length-1],
                message: "User registered!"
            }
        } catch (error) {
            return {
                error: error,
                message: "Internal error." 
            }
        }    
    } 
}

export const usersStore = new Store();
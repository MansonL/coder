import e from "express";

declare global {
    namespace Express {
        interface User extends IUser {}
    }
}

export interface IUser  {
    [key: string]: string | number;
    _id: string;
    timestamp: string;
    user: string;
    password: string,
    name: string;
    surname: string;
    age: number;
    alias: string;
    avatar: string;
}

export class Store {

    private users: IUser[];
    
    constructor(){
        this.users = [];
    }

     findOne (username: string, cb: (error: any | undefined, user: IUser | undefined) =>  void) {
        try {
            const user = this.users.filter(user => user.user === username)[0];
            cb(null, user)
        } catch (error) {
            cb(error, undefined);
        }
    }

    findByID (id: string, cb: (error: any | undefined, user: IUser | undefined) => void) {
        try {
            const user = this.users.filter(user => user._id === id)[0];
            cb(undefined, user)
        } catch (error) {
            cb(error, undefined)
        }
    }

    saveOne (user: IUser, cb: (error: any | undefined, user: IUser | undefined) =>  void) {
        try {
            this.users.push(user);
            cb(null, user)
        } catch (error) {
            cb(error, undefined)
        }    
    } 
}

export const usersStore = new Store();
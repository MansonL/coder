import uuid from 'uuid'

declare global {
    namespace Express {
        interface User extends IUser {}
    }
}

export interface IUser extends INew_User {
    
    _id: string,
}

export interface INew_User {
    [key: string]: string,
    timestamp: string;
    username: string;
    password: string,
    name: string;
    surname: string;
    age: string;
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
            console.log(this.users)
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

    saveOne (newUser: INew_User, cb: (error: any | undefined, user: IUser | undefined) =>  void) {
        try {
            const user = {
                ...newUser,
                _id: uuid.v4(),
            }
            this.users.push(user);
            cb(null, user)
        } catch (error) {
            cb(error, undefined)
        }    
    } 
}

export const usersStore = new Store();
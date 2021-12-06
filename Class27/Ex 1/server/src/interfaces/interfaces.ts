


/**
 *
 * Type of User Object to be stored and query from Mongo.
 *
 */
export interface IUser extends INew_User {
    _id: string;
}

/**
 *
 * Type of User Object receiving from the frontend.
 *
 */
export interface INew_User {
    [key: string]: string;
    timestamp: string;
    username: string;
    password: string;
    name: string;
    surname: string;
    age: string;
    alias: string;
    avatar: string;
}

/**
 *
 * Response type of adding, deleting & updating products from storage.
 *
 */

export interface CUDResponse {
    message: string;
    data:  IUser | [];
}

/**
 * 
 * Internal Error Response type
 * 
 */
export interface InternalError {
    error: any;
    message: string;
}
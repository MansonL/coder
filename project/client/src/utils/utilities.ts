import { IMongoMessage, IMongoProduct, IMongoUser, IMongoFBUser } from "./interfaces";

/**
 * 
 * The main reason for this functions is to check if the data received is an empty array (error) or 
 * a custom interface (will mean that there wasn't any error).
 * 
 */

/**
 * 
 * 
 * @param product 
 * 
 * @returns product is empty or not
 */

export const hasProductOrEmpty = (product: [] | IMongoProduct): product is IMongoProduct => {
    return 'title' in product
}

/**
 * 
 * 
 * @param user
 * 
 * @returns users is empty or not
 */

export const hasUserOrEmpty = (user: [] | IMongoUser): user is IMongoUser => {
    return 'user' in user
}

/**
 * 
 * 
 * @param message
 * 
 * @returns message is empty or not
 */

export const hasMessagesOrEmpty = (message: [] | IMongoMessage): message is IMongoMessage  => {
    return 'message' in message
}

/**
 * 
 * Functions for checking types
 * 
 */


 export const isUser = (data: any): data is IMongoUser => {
    if(data.length){
        return 'username' in data[0]
    }else{
        return 'username' in data
    }
}

export const isFBUser = (data: any): data is IMongoFBUser => {
    if(data.length){
        return 'facebookID' in data[0]
    }else{
        return 'facebookID' in data
    }
}


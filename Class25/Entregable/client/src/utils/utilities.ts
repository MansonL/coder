import { IMongoCartProduct, IMongoMessage, IMongoProduct, IMongoUser, INew_Product } from "../../../server/src/interfaces/interfaces";
import { socket } from "../lib/socket";

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


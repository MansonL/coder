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

/**
 * 
 * A function that determines which products should be updated and requested through sockets.
 * @param type This will be the type that the user selected in the menu and the Main component pass to Products
 * component.
 * 
 */
export const whichUpdate = (type: string): void => {
        switch(type){
            case 'Messages': 
                socket.emit('message');
                socket.emit('users');
                break;
            case 'DB Products' || 'normal':
                socket.emit('products');
                break;
            case 'DB Cart' || 'cart':
                socket.emit('cart');
                break;
            case 'Random Generated' || 'random':
                socket.emit('randomProducts');
                break;
            }
}
/**
 *
 * Type of Product to be stored and query from Mongo
 *
 */
export interface IMongoProduct extends INew_Product {
    _id: string;
}

/**
 *
 * Type of Cart Product to be query from Mongo
 *
 */
export interface IMongoCartProduct extends ICartProduct {
    _id: string;
}

/**
 * Type of Cart Product to be stored to Mongo DB
 *
 */
export interface ICartProduct extends INew_Product {
    product_id: string;
}

/**
 *
 * Type of Product Object we are receiving from the frontend.
 *
 */
export interface INew_Product {
    title: string;
    description: string;
    timestamp: string; // Will have this type after the controller set product's
    code: string; // timestamp.
    img: string;
    stock: number;
    price: number;
}

/**
 *
 * Type of Message Object to be stored and query from Mongo.
 *
 */
export interface IMongoMessage extends INew_Message {
    _id: string;
}

/**
 *
 * Type of Message Object receiving from the frontend.
 *
 */
export interface INew_Message {
    timestamp: string;
    user: string;
    message: string;
}

/**
 *
 * Type of User Object to be stored and query from Mongo.
 *
 */
export interface IMongoUser extends INew_User {
    _id: string;
}

/**
 *
 * Type of User Object receiving from the frontend.
 *
 */
export interface INew_User {
    timestamp: string;
    user: string;
}

/**
 *
 * Type of the possible Update Object properties in an update request.
 *
 */
export interface IUpdate {
    title?: string;
    description?: string;
    code?: string;
    img?: string;
    stock?: number;
    price?: number;
}

/**
 *
 * Response type of adding, deleting & updating products from storage.
 *
 */

export interface CUDResponse {
    message: string;
    data: IMongoProduct | IMongoMessage | IMongoUser | [];
}

/**
 *
 * Product Storage Classes structure.
 *
 */
export interface DBProductsClass {
    init?(): Promise<void>;
    get(id?: string | undefined): Promise<IMongoProduct[] | []>;
    add(newProduct: INew_Product): Promise<CUDResponse>;
    update(id: string | number, data: IUpdate): Promise<CUDResponse>;
    delete(id: string | number): Promise<CUDResponse>;
    //query(options: IQuery): Promise< IMongoProduct[] | []>;
}

/**
 *
 * Cart Storage Classes structure.
 *
 */
export interface DBCartClass {
    init?(): Promise<void>;
    get(
        id?: string | undefined
    ): Promise<ICartProduct[] | IMongoCartProduct[] | []>;
    add(id: string, product: INew_Product): Promise<CUDResponse>;
    delete(id: string): Promise<CUDResponse>;
}

/**
 *
 * Message Storage Classes structure
 *
 */
export interface DBMessagesClass {
    init?(): Promise<void>;
    get(): Promise<IMongoMessage[] | []>;
    add(msg: INew_Message): Promise<CUDResponse>;
}

/**
 *
 * Users Storage Classes structure
 *
 */
export interface DBUsersClass {
    init?(): Promise<void>;
    get(id?: string | undefined): Promise<IMongoUser[] | []>;
    add(user: INew_User): Promise<CUDResponse>;
}

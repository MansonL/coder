import { StringSchema } from 'joi';

/**
 *
 * Type of Product to be stored to and query from the DB.
 *
 */
export interface IProduct extends INew_Product {
    id: number | string;
}

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
 * Type of Cart Product to be stored and query from Mongo
 *
 */
export interface IMongoCartProduct extends ICartProduct {
    _id: string;
}

/**
 *
 * Cart data obtained from Cart Table
 *
 */
export interface ICartProduct {
    product_id: string | number;
    timestamp: string;
    title: string;
    description: string;
    code: string;
    img: string;
    stock: number;
    price: number;
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
 * Type of the possible Query Object properties in a query request.
 *
 */
export interface IQuery {
    title: string;
    code: string;
    stock: {
        minStock: number;
        maxStock: number;
    };
    price: {
        minPrice: number;
        maxPrice: number;
    };
}

/**
 *
 * Response type of adding, deleting & updating products from storage.
 *
 */

export interface CUDResponse {
    message: string;
    data: IProduct | IMongoProduct | IMongoCartProduct | [];
}

/**
 *
 * Product Storage Classes structure.
 *
 */
export interface DBProductsClass {
    init?(): Promise<void>;
    get(id?: string | undefined): Promise<IProduct[] | IMongoProduct[] | []>;
    add(newProduct: INew_Product): Promise<CUDResponse>;
    update(id: string | number, data: IUpdate): Promise<CUDResponse>;
    delete(id: string | number): Promise<CUDResponse>;
    query(options: IQuery): Promise<IProduct[] | IMongoProduct[] | []>;
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

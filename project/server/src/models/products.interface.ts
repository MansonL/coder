/**
 *
 * Type of Product to be stored to and query from the DB
 *
 */
export interface IProduct {
    id: string;
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
 * Type of Product Object we are receiving from the frontend
 *
 */
export interface INew_Product {
    title: string;
    description?: string;
    img: string;
    stock: number;
    price: number;
}
/**
 *
 * Type of the possible filters in a product query
 *
 */
export interface IQueryOrUpdate {
    title?: string;
    description?: string;
    img?: string;
    stock?: number;
    price?: number;
}

/**
 *
 * Response type of adding, deleting & updating products from storage
 *
 */

export interface CUDResponse {
    message: string;
    data: IProduct;
}

/**
 *
 * Product Storage Classes structure
 *
 */
export interface DBProductsClass {
    get(id?: string | undefined): Promise<IProduct[] | []>;
    add(product: INew_Product): Promise<CUDResponse>;
    update(id: string, data: IQueryOrUpdate): Promise<CUDResponse>;
    delete(id: string): Promise<CUDResponse>;
    query(options: IQueryOrUpdate): Promise<IProduct[] | []>;
}

/**
 *
 * Cart Storage Classes structure
 *
 */
export interface DBCartClass {
    get(id?: string | undefined): Promise<IProduct[] | []>;
    add(product: IProduct): Promise<CUDResponse>;
    delete(id: string): Promise<CUDResponse>;
}

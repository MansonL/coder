import { CUDResponse, IMongoCartProduct, IMongoMessage, IMongoProduct, IMongoUser, InternalError } from "./interfaces"

export const isCartProduct = (data: any): data is IMongoCartProduct  => {
    return 'product_id' in data[0]
}

export const isProduct = (data: any): data is IMongoProduct => {
    return '_id' in data[0]
}

export const isUser = (data: any): data is IMongoUser => {
    return 'username' in data[0]
}

export const isMessages = (data: any): data is IMongoMessage => {
    return 'author' in data[0]
}

export const isInternalError = (data: any): data is InternalError => {
    return 'error' in data
}

export const isCUDResponse = (data: any): data is CUDResponse => {
    return 'data' in data
}
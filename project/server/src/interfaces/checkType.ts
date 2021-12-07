import { CUDResponse, IMongoCartProduct, IMongoFBUser, IMongoMessage, IMongoProduct, IMongoUser, InternalError } from "./interfaces"

export const isCartProduct = (data: any): data is IMongoCartProduct  => {
    if(data.length){
        return 'product_id' in data[0]
    }else{                              // This implementation is for when we request an array of data 
        return 'product_id' in data    // from the db and need to check if there was an error or everything 
    }                                  // gone well. Note that in 
}

export const isProduct = (data: any): data is IMongoProduct => {
    if(data.length){
        return '_id' in data[0]
    }else{
        return '_id' in data
    }   
}

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

export const isMessages = (data: any): data is IMongoMessage => {
    if(data.length){
        return 'author' in data[0]
    }else{
        return 'author' in data
    }
}

export const isCUDResponse = (data: any): data is CUDResponse => {
    return 'data' in data
}
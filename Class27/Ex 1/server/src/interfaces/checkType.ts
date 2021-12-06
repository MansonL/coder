import { CUDResponse, IUser } from "./interfaces"

export const isUser = (data: any): data is IUser => {
    if(data.length){
        return 'username' in data[0]
    }else{
        return 'username' in data
    }
}

export const isCUDResponse = (data: any): data is CUDResponse => {
    return 'data' in data
}
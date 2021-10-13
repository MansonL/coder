import { Request, Response, NextFunction } from "express";
import { EProductsErrors, EUsersErrors } from "../common/EErrors";
import { CUDResponse, IMongoUser, INew_User } from "../interfaces/interfaces";
import { ApiError } from "../utils/errorApi";
import { validator } from "../utils/joiSchemas";
import { usersApi } from "../api/users";

/**
 *
 * Users Controller Class
 *
 */

 class UsersController {
    async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id : string = req.params.id
        console.log(`[PATH] Inside controller.`);
        const { error } = validator.id.validate(id)
        if(error){
            next(ApiError.badRequest(EProductsErrors.IdIncorrect));
        }else{
        const messages: IMongoUser[] | [] = await usersApi.getUser(id);
        if(messages.length > 0){
            res.status(200).send(messages);
        }else{
            next(ApiError.badRequest(EUsersErrors.NoUsers))
        }
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log(`[PATH] Inside controller.`);
        const messages: IMongoUser[] | [] = await usersApi.getUsers();
        if(messages.length > 0){
            res.status(200).send(messages);
        }else{
            next(ApiError.badRequest(EUsersErrors.NoUsers))
        }
    }
    async save(req: Request, res: Response, next: NextFunction): Promise<void> {
        const message: INew_User = req.body;
        console.log(`[PATH] Inside controller.`);
        const result : CUDResponse = await usersApi.addUser(message);
        res.status(200).send(result);
    }
}

export const usersController = new UsersController();
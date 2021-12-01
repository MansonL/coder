import { Request, Response, NextFunction } from 'express';
import { EProductsErrors, EUsersErrors } from '../common/EErrors';
import { CUDResponse, IMongoUser, INew_User } from '../interfaces/interfaces';
import { ApiError } from '../utils/errorApi';
import { validator } from '../utils/joiSchemas';
import { usersApi } from '../api/users';
import moment from 'moment';

/**
 *
 * Users Controller Class
 *
 */

class UsersController {
    async getOne(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const id: string = req.params.id;
        console.log(`[PATH] Inside controller.`);
        const { error } = await validator.id.validateAsync(id);
        if (error) {
            next(ApiError.badRequest(EProductsErrors.IdIncorrect));
        } else {
            const users: IMongoUser[] | [] = await usersApi.getUser(id);
            if (users.length > 0) {
                res.status(200).send(users);
            } else {
                next(ApiError.badRequest(EUsersErrors.NoUsers));
            }
        }
    }
    async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        console.log(`[PATH] Inside controller.`);
        const users: IMongoUser[] | [] = await usersApi.getUsers();
        if (users.length > 0) {
            res.status(200).send(users);
        } else {
            next(ApiError.badRequest(EUsersErrors.NoUsers));
        }
    }
    async save(req: Request, res: Response, next: NextFunction): Promise<void> {
        const user: INew_User = req.body;
        const { error } = validator.user.validate(user);
        console.log(error);
        if (error) {
            next(ApiError.badRequest(EUsersErrors.IncorrectProperties));
        } else {
            console.log(`[PATH] Inside controller.`);
            const result: CUDResponse = await usersApi.addUser(user);
            res.status(200).send(result);
        }
    }
}

export const usersController = new UsersController();

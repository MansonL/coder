import { Request, NextFunction, Response } from 'express';
import { messagesApi } from '../api/messages';
import { IMongoMessage, INew_Message } from '../interfaces/interfaces';

/**
 *
 * Messages Controller Class
 *
 */

class MessagesController {
    async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        const messages: IMongoMessage[] | [] = await messagesApi.getMsg();
        console.log(`[PATH] Inside controller.`);
        res.status(200).send(messages);
    }
    async save(req: Request, res: Response, next: NextFunction): Promise<void> {
        const message: INew_Message = req.body;
        console.log(`[PATH] Inside controller.`);
        const result = await messagesApi.addMsg(message);
        res.status(200).send(result);
    }
}

export const messagesController = new MessagesController();

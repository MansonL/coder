import msgController from '../services/db';
import { Request, Response } from 'express';
import { IMessage, IUser } from '../models';

const { getMessages, getUsers, getUserId, saveMessage, saveUser } = msgController;

const getMsgs = async (req: Request, res: Response) => {
    try {
        const messages = await getMessages();
        res.send(messages);
    } catch (error) {
        res.json(error);
    }
};
const getUsrs = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        res.send(users);
    } catch (error) {
        res.json(error);
    }
};
const saveMsg = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const user_id = await getUserId(data.user);
        data.user_id = user_id;
        const result = await saveMessage(data);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
};
const saveUsr = async (req: Request, res: Response) => {
    try {
        const { user } = req.body;
        const result = await saveUser(user);
        res.send(result);
    } catch (error) {
        res.json(error);
    }
};

export { getMsgs, getUsrs, saveMsg, saveUsr };

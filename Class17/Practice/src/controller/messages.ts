import msgController from '../services/db';
import { Request, Response } from 'express';
import { Message, User } from '../utils';

const { getMessages, getUsers, getUserId, saveMessage } = msgController;

const getAll = async (req: Request, res: Response) => {
    const messages = await getMessages();
    res.send(messages);
};

const saveMsg = async (req: Request, res: Response) => {
    const data: Message = req.body;
    const user_id = await getUserId(data.user);
    data.user_id = user_id;
    const result = await saveMessage(data);
    res.send(result);
};

export { getAll, saveMsg };

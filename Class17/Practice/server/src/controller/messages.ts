import msgController from '../services/db';
import { Request, Response} from 'express';
import { Message, User } from '../utils';

const { getMessages, getUsers, getUserId, saveMessage, saveUser } = msgController;

const getMsgs = async (req: Request, res: Response) => {
    const messages = await getMessages();
    res.send(messages);
};
const getUsrs = async (req: Request, res: Response) => {
    const users = await getUsers();
    res.send(users);
}
const saveMsg = async (req: Request, res: Response) => {
    const data : Message = req.body;
    const user_id = await getUserId(data.user);
    data.user_id = user_id;
    const result = await saveMessage(data);
    res.send(result);
};
const saveUsr = async (req: Request, res: Response) => {
    const data : string = req.body;
    const result : User = await saveUser(data);
    res.send(result)
}

export { getMsgs, getUsrs, saveMsg, saveUsr };

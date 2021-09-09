import msgController from '../services/db';
import { Request, Response } from 'express';
import { Message, User } from '../utils';

const { getMessages, getUsers, getUserId, saveMessage, saveUser, deleteUser, deleteMessage } = msgController;

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
        const data: Message = req.body;
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
        const {user} = req.body;
        console.log(user);
        const result = await saveUser(user);
        res.send(result);
    } catch (error) {
        res.json(error);
    }
}
const deleteMsg = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        console.log(id);
        const result = await deleteMessage(id);
        res.send(result);
    } catch (error) {
        res.json(error)
    }

}
const deleteUsr = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await deleteUser(id);
        res.send(result);
    } catch (error) {
        res.json(error);
    }
};
export { getMsgs, getUsrs, saveMsg, saveUsr, deleteMsg, deleteUsr};

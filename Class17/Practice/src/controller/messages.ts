import msgController from "../services/db";
import { Request, Response } from "express";
import { Message, User } from "../utils";

const {getMessages, getUsers, saveMessage} = msgController

const getAll = async(req: Request, res: Response) => {
      const messages = await getMessages();
      res.send(messages)
}


const saveMsg = async(req: Request, res: Response) => {
    const data: Message | User = req.body;
    const result = await saveMessage(data);
    res.send(result);
}


export {getAll, saveMsg}
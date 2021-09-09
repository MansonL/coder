import { Router } from 'express';
import express from 'express';
import { getMsgs, getUsrs, saveMsg, saveUsr, deleteUsr, deleteMsg } from '../controller/messages';

const msgRouter: Router = express.Router();

msgRouter.get('/messages', getMsgs);
msgRouter.get('/users', getUsrs);
msgRouter.post('/users', saveUsr);
msgRouter.post('/messages', saveMsg);
msgRouter.delete('/messages/:id', deleteMsg);
msgRouter.delete('/users/:id', deleteUsr);

export default msgRouter;

import { Router } from 'express';
import express from 'express';
import { getAll, saveMsg } from '../controller/messages';

const msgRouter: Router = express.Router();

msgRouter.get('/chat', getAll);
msgRouter.post('/chat', saveMsg);

export default msgRouter;

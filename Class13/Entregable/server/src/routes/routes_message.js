import express from "express";
import { controller } from "../messages";

const router_messages = express.Router();


router_messages.get('/show', controller.getMessages);

router_messages.post('/save', controller.sendMessages);

export { router_messages }
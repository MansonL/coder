"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var messages_1 = require("../controller/messages");
var msgRouter = express_1.default.Router();
msgRouter.get('/messages', messages_1.getMsgs);
msgRouter.get('/users', messages_1.getUsrs);
msgRouter.post('/users', messages_1.saveUsr);
msgRouter.post('/messages', messages_1.saveMsg);
exports.default = msgRouter;

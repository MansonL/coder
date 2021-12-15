"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
process.on("message", (port) => {
    app.listen(port, () => {
        console.log(`Process ${process.pid} hosting server at port ${port}`);
    });
    app.get("/", (req, res) => {
        res.send(`Process ${process.pid}`);
    });
});

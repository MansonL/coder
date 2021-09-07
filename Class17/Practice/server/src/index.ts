import { Application} from "express";
import express from 'express'
import http from 'http'
import cors from 'cors';
import msgRouter from "./routes";

const app : Application = express();
const server  = http.createServer(app);
const PORT = 8080;

server.listen(PORT, () => console.log(`Server hosted at PORT: ${PORT}`));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', msgRouter)


export default server

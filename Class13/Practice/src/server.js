import express from 'express';
import http from 'http';
import socket from 'socket.io';
import path from 'path';
import {router} from './routes/routes'

/* --------------------------- SERVER, APP & SOCKET ----------------------------- */


const app = express();
const server = http.Server(app);
const io = socket(server);
const PORT = 8080;

const publicPath = path.resolve(__dirname, './public');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));


/* ------------------------------ ROUTER -------------------------------- */

app.use('/products', router)
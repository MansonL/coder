import express from "express";
import http from "http";
import socket from "socket.io";
import {router} from "./routes/routes";
import cors from 'cors';

/* --------------------------- SERVER, APP & SOCKET ----------------------------- */


const app = express();
const server = http.createServer(app);
const io = socket(server);
const PORT = 8080;
//const publicPath = path.resolve("../../client/public");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


server.listen(PORT, () => console.log(`Server hosted at PORT: ${server.address().port}`));

io.on("connection", socket => {
    console.log('New client connected');
    io.sockets.emit('renderTable');
    socket.on('save', () => {
        console.log('Updating...')
        io.sockets.emit('update');
    });
});

/* ------------------------------ ROUTER -------------------------------- */

app.use("/products", router);

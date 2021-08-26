import express from "express";
import http from "http";
import socket from "socket.io";
import { router_products } from "./routes/routes_products";
import { router_messages } from "./routes/routes_message";
import cors from 'cors';

/* --------------------------- SERVER, APP & SOCKET ----------------------------- */


const app = express();
const server = http.createServer(app);
const PORT = 8080;

server.listen(PORT, () => console.log(`Server hosted at PORT: ${server.address().port}`));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use("/products", router_products);
app.use("/message", router_messages)



const io = socket(server);

io.on("connection", socket => {
    console.log('New client connected');
    io.sockets.emit('renderTable');
    io.sockets.emit('renderMessages')
    socket.on('saveProduct', () => {
        console.log('Updating...')
        io.sockets.emit('updateProducts');
    });
    socket.on('test', data => {
        console.log(data)
    })
    socket.on('saveMessage',() => {
        
        console.log('Updating messages');
        io.sockets.emit('updateMessages')
    })
});

/* ------------------------------ ROUTER -------------------------------- */


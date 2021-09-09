import { Application } from 'express';
import express from 'express';
import http from 'http';
import cors from 'cors';
import msgRouter from './routes';
import { Server } from 'socket.io';

const app: Application = express();
const server = http.createServer(app);
const PORT = 8080;

server.listen(PORT, () => console.log(`Server hosted at PORT: ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', msgRouter);

const io = new Server(server);
io.on('connection', (socket) => {
    console.log('New client connected!');
    io.sockets.emit('renderAll');
    socket.on('saveMessage', () => {
        console.log('Updating messages');
        io.sockets.emit('updateMessages');
    });
    socket.on('saveUser', () => {
        console.log('Updating users');
        io.sockets.emit('updateUsers');
    });
});

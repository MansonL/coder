import http from 'http';
import path from 'path';
import { app } from './services/app';
import * as dotenv from 'dotenv';
//import { socketConnection } from './services/socket';
import * as socket from 'socket.io';

const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });
export const server: http.Server = http.createServer(app);
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server hosted at PORT: ${PORT}`));
//socketConnection();
const io = new socket.Server(server);
io.on('connection', (socket) => {
    console.log('New client connected!');
    socket.on('products', () => {
        console.log('Updating DB Products...');
        io.sockets.emit('products');
    });
    socket.on('randomProducts', (qty: number | undefined) => {
        console.log('Updating random products...');
        io.sockets.emit('randomProducts', qty);
    });
    socket.on('cart', () => {
        console.log('Updating cart products...');
        io.sockets.emit('cart');
    });
    socket.on('message', () => {
        console.log('Updating chat messages...');
        io.sockets.emit('messages');
    });
    socket.on('users', () => {
        console.log('Updating chat users...');
        io.sockets.emit('users');
    });
});

import * as socket from 'socket.io'
import { server } from '..';

const io = new socket.Server(server);
export const socketConnection = () => {
    io.on('connection', (socket) => {
        console.log('New client connected!');
        socket.on('products', () => {
            console.log('Updating DB Products...');
            io.sockets.emit('products');
        });
        socket.on('randomProducts', () => {
            console.log('Updating random products...')
            io.sockets.emit('randomProducts');
        });
        socket.on('cart', () => {
            console.log('Updating cart products...');
            io.sockets.emit('cart');
        });
        socket.on('messages', () => {
            console.log('Updating chat messages...');
            io.sockets.emit('messages');
        })
        socket.on('users', () => {
            console.log('Updating chat users...');
            io.sockets.emit('users')
        })
    });
}

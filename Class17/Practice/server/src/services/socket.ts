import { Server } from 'socket.io';
import server from '..';

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('New client connected!');
    io.sockets.emit('renderAll'); // Need to change in the UI to render both messages and users table
    socket.on('saveMessage', () => {
        console.log('Updating messages');
        io.sockets.emit('updateMessages');
    });
    socket.on('saveUser', () => {
        console.log('Updating users');
        io.sockets.emit('updateUsers');
    });
});

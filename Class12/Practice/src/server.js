import path from 'path';
const express = require('express'),
      APP = express(),
      http = require('http').Server(APP),
      io = require('socket.io')(http);

APP.use(express.static('./public'));
APP.get('/', (req,res) => {
     res.sendFile('index.html', {root: __dirname})
});
http.listen(8080, ()=>{
    console.log(`Server hosted at PORT: ${http.address().port}`)
});
io.on('connection', socket => {
    console.log('New client connected!');
    socket.emit('welcome', 'Hi there!');
    socket.on('text', text => {
        io.sockets.emit('show', text);
    })
});

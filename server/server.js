const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('User connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome man',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'One member joined',
        createdAt: new Date().getTime()
    })

    socket.on('createMessage', (message) => {
        console.log(message);
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: 1234
        });
    });


    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
})

app.use(express.static(path.join(__dirname, '../public')));

server.listen(port, () => {
    console.log('Server started on port 3000');
});
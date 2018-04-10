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


    socket.on('createMessage', (message) => {
        console.log(message);
        io.emit('newMessage', {
            message,
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
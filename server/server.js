const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/generateMessage');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {

    socket.emit('newMessage', generateMessage('Admin', 'Welcome Man'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'One member joined'))

    socket.on('createMessage', (message, callback) => {
        console.log(message);
        io.emit('newMessage', generateMessage(message.createdBy, message.text));

        callback('recived');
    });

    socket.on('createLocationMessage',(message) => {
        io.emit('newLocationMessage', generateLocationMessage(message.createdBy, message.latitude, message.longitude))
    });


    socket.on('disconnect', () => {
        io.emit('newMessage', generateMessage('Admin', 'One member disconnected'));
    });
})

app.use(express.static(path.join(__dirname, '../public')));

server.listen(port, () => {
    console.log('Server started on port 3000');
});
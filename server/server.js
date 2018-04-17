const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/generateMessage');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');


const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {

    socket.on('join', function (message, callback) {
        if (!isRealString(message.name) || !isRealString(message.room)) {
            return callback('Enter Valid Room and Name.')
        }

        socket.join(message.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, message.name, message.room);

        io.to(message.room).emit('updateUserList', users.getUserList(message.room));
        //socket.leave(message.room);

        // io.emit = io.to(message.room).emit
        // socket.broadcast.emit =  socket.broadcast.to(message.room).emit
        // socket.emit = socket.emit

        socket.emit('newMessage', generateMessage('Admin', `Welcome ${message.name}`));

        socket.broadcast.to(message.room).emit('newMessage', generateMessage('Admin', `${message.name} joined.`))


        callback();
    })


    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
        io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        callback('recived');
    });

    socket.on('createLocationMessage', (message) => {
        var user = users.getUser(socket.id);
        if(user){
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, message.latitude, message.longitude));
        }
    });


    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        io.to(user.room).emit('updateUserList', users.getUserList(user.room))
        io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} left.`));
    });
})

app.use(express.static(path.join(__dirname, '../public')));

server.listen(port, () => {
    console.log('Server started on port 3000');
});
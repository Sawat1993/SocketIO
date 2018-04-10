var socket = io();

socket.on('connect', function () {
    console.log('connected');

    socket.emit('createMessage' ,{
        createdBy: 'Sawatantra',
        text: 'xxx'
    });
});

socket.on('newMessage', function(message){
    console.log(message);
});

socket.on('disconnect', function () {
    console.log('disconnect');
});
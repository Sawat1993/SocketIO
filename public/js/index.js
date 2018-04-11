var socket = io();

socket.on('connect', function () {
    console.log('connected');

});

socket.on('newMessage', function (message) {
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
    console.log('disconnect');
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        createdBy: 'User',
        text: jQuery('[name=message]').val()
    }, function (data) {
        console.log(data);
    });
});
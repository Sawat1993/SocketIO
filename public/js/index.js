var socket = io();

socket.on('connect', function () {
    console.log('connected');

});

socket.on('newMessage', function (message) {
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    li.text(`${message.from}: `);
    var a = jQuery('<a target="_blank">My current location</a>');
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
    console.log('disconnect');
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        createdBy: 'User',
        text: messageBox.val()
    }, function (data) {
        messageBox.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Unable to fetch Location');
    }

    locationButton.attr('disabled','disabled')
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        locationButton.removeAttr('disabled');
        return alert('Error in fetching location');
    })
})
var io = require('socket.io').listen(8085),
$$ = {users:{}, messages: []};

io.sockets.on('connection', function (socket) {//console.log(socket.request.connection);
	$$.users[socket.id] = {name: socket.handshake.address};

	socket.emit('change', {
		value: $$
	})
	
	socket.on('message', function (message) { //console.log(message);
		socket.broadcast.send(message); // передаем всем кроме себя
	});

	socket.on('disconnect', function() { // удалим из комнаты
		delete $$.users[socket.id];
	});
});



var O = require('observed')
O($$).on('change', function(data){
	io.sockets.emit('change', {
		path: '["' + data.path.replace(/\./g, '"]["') + '"]',
		type: data.type,
		value: data.value
	})
})

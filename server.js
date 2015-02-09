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




/*
var o = require('observe-js');
var obj = { foo: { bar: 'baz' } };
var observer = new o.PathObserver(obj, 'foo.bar');
observer.open(function(newValue, oldValue) {
	console.log(newValue, oldValue);
});
obj.foo = 123;
*/


/*
var myObj = { id: 1, foo: {bar: 'bar'} };
var observer = new o.ObjectObserver(myObj);
observer.open(function(added, removed, changed, getOldValueFn) {
  console.log(added, removed, changed);
});
myObj.foo.bar = 123; 
*/



/*
var O = require('observed')
var object = [1,2,3];//{ name: { last: 'Heckmann', first: 'aaron', foo:[{bar:1}, 2,3]  }}
O(object).on('change', console.log)  
object[1] = 123;
*/
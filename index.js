var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('action', function(message) {
		//here's how we receive an 'action' socket message
		console.log(message);			
	});
	
	//here's how we send a message
	io.emit('action','message from server-side website');
});

app.set('port', process.env.port || 3000);

http.listen(app.get('port'), function(){
  console.log('listening on *:' + app.get('port'));
});

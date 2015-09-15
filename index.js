var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var config = require('./config');

var clients = [];

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	clients.push({active:true,id:socket.id});
	if(clients.length == config.playerCount) startGame();
	socket.on('overSpeed', function() {
		var activePlayerCount = 0;
		var lastActivePlayer;
		console.log(clients.length);
		clients.forEach(function(client){
			console.log(client.id);
			///if(client.id == socket.id) client.active = false;
			if(client.active) {
				lastActivePlayer = client;
				console
				activePlayerCount++;
			}
		});
		if(activePlayerCount == 1) endGame(lastActivePlayer);
	});
	
	//here's how we send a message
	io.emit('action','message from server-side website');
});

app.set('port', process.env.port || 3000);

http.listen(app.get('port'), function(){
  console.log('listening on *:' + app.get('port'));
});

function startGame(){
	io.emit('startGame');
}

function endGame(winner){
	io.emit('endGame',winner);
}
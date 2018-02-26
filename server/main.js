var express = require('express'); //dependencia express
var app = express(); //instanciar la aplicacion con express
var server = require('http').Server(app); //crear servidor Http
var io = require('socket.io')(server); //crear servidor io de tipo socket con el servidor web

//Array de toda la conversación
var messages = [{
	id: 1,
	text: "Hola, escribe un mensaje para empezar a chatear",
	author: "Admin"
}]

app.use(express.static('public')) // middleware entre cliente/servidor para tomar los archivos de public

// funcion para la ruta index de la aplicacion
app.get('/hello', function(req, res){
	res.status(200).send("Hola Mundo2");
});

//funcion que escucha un socket y hace una funcion dependiendo
//del nombre del socket
io.on('connection', function(socket) { 
	console.log("Alguien se ha conectado con Sockets");

	// emitir socket al cliente
	socket.emit('messages', messages);

	// recibir socket del cliente
	socket.on('new-message', function(data){
		messages.push(data); // hacer push hacia el arrego de los mensajes

		io.sockets.emit("messages", messages); // actualizar el servidor para todos los demás sockets
	});
});

// funcion que escucha el servidor en el puerto 8080 de localhost
server.listen(8080, function() {
	console.log("Servidor corriendo en http://localhost:8080");
});
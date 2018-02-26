//conectarse a un servidor de sockets
var socket = io.connect("http://localhost:8080", {"forceNew" : true});

// funcion que escucha el socket desde el servidor
socket.on('messages', function(data) {
	console.log(data);
	render(data);  //llamar funcion que use el data del servidor
});

// renderizado de lo que trae la respuesta del servidor
// mapea el data del socket recibido
function render(data){
	var html = data.map(function(item, index){
		return(`<div>
					<strong>${item.author}</strong>:
					<em>${item.text}</em>
				</div>`);
	}).join(" ");

	document.getElementById("messages").innerHTML = html;
}	

//funcion para mandar mensaje
function addMessage(e){
	console.log("username" + document.getElementById("username").value );
	var payload = {   //objeto que se envia al servidor
		author: document.getElementById("username").value,
		text: document.getElementById("texto").value
	};
	document.getElementById("texto").value = "";
	document.getElementById("texto").focus(); 

	socket.emit('new-message', payload); //emitir socket al servidor
	return false;
}
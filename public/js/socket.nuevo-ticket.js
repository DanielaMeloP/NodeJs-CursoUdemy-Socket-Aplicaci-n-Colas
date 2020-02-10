// Comando para establecer la conexion
var socket = io();

var label = $("#lblNuevoTicket");

// Escucha conexiones
socket.on('connect', function() {
    console.log("Conectado al servidor");
});

socket.on('disconnect', function() {
    console.log("No hay conexión con el servidor");
});

$("button").on("click", function() {
    //console.log("Click");
    socket.emit("siguienteTicket", null, function(siguienteTicket){
        label.text(siguienteTicket);
    });
});

socket.on("estadoActual", function(resp){
    label.text(resp.actual);
});
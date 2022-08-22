const Server = require("./models/server");
require('dotenv').config();
const server = new Server();

server.execute();
/* VERSION ANTERIOR
..
..
// servidor de express
const express = require('express');
const app = express();
//servidor de sockets
const server = require('http').createServer(app);
// cpnfiguracion del socket server
const io = require('socket.io')(server);

//directorio publico 
app.use(express.static(__dirname+ '/public'));

io.on('connection', ( socket ) => {
    console.log('cliente conectado',  socket.id);
    /*socket.emit('mensaje-bienvenida', {
        msg: 'Bienvenido!!!',
        fecha: new Date()
    });
    socket.on('mensaje-to-server', (data) => {
        console.log(data);
        socket.emit('mensaje-from-server', data);
    });
});
server.listen(3000, () => {
    console.log('running in port 3000');
});*/
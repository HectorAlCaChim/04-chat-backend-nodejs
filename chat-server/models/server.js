const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const authRoute = require('../routers/auth')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // crear conexion a la base de datos
        dbConnection();
        // http server
        this.server = http.createServer(this.app);
        // configuraciones de socket
        this.io = socketio(this.server);
    }
    middelwares() {
        // this.app.use(express.static(path.resolve(__dirname, '../public')));
        // cors refrencias cruzadas
        this.app.use(cors());
        //Parsea del body
        this.app.use(express.json());
        // API ENDPOINTS
        this.app.use('/api/auth', require('../routers/auth'));
        this.app.use('/api/mensajes', require('../routers/messages'));
    }
    socketConfig() {
        new Sockets(this.io)
        
    }
    execute() {
        //inicializa middlewares
        this.middelwares();
        // Inicializar sockets
        this.socketConfig();
        //inicializa el server
        this.server.listen(this.port, () => {
            console.log(`server on port: ${this.port}`);
        })
    }
}
module.exports = Server;
const {comprobarJWT} = require('../helpers/jwt-helper');
const {usuarioConectado, desconectadoConectado, getUsuarios, guardarMensaje} = require('../controllers/socket');
class Sockets {

    constructor (io) {
        this.io = io;
        this.socketsEvents();
    }
    socketsEvents() {
        // ON connection
        this.io.on('connection', async( socket ) => {
            const [valido, uid] = comprobarJWT(socket.handshake.query['token']);
            if (!valido) {
                return socket.disconnect();
            }
            const usuario = await usuarioConectado(uid);
            console.log('cliente conectado', usuario.nombre);

            //TODO: SOCKET JOIN
            //unir un usuario a una sala en particular
            socket.join(uid);

            // TODO: VALIDAR TOKEN
            // Si el token es valido desconectar

            //TODO: SABER QUE EL USUARIO ESTE ACTIVO

            //TODO: EMITIR USUARIOS CONECTADOS
            this.io.emit('lista-usuarios', await getUsuarios());

            //TODO: ESCUCHAR CUANDO SE MANDA UN MENSAJE PERSONAL
            socket.on('mensaje-personal', async(payload) => {
                const mensaje = await guardarMensaje(payload);
                this.io.to(payload.para).emit('mensaje-personal', mensaje);
                this.io.to(payload.de).emit('mensaje-personal', mensaje);
            });

            //TODO: DESCONECTAR
            //MARCAR EN LA BASE DE DATOS QUE USUARIO SE DECONECTO
            socket.on('disconnect', async() => {
                console.log('deconectado');
                await usuarioConectado(uid);
                this.io.emit('lista-usuarios', await getUsuarios());
            });
            
        });
    }
}
module.exports = Sockets;
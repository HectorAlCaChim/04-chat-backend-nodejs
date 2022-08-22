const Usuario = require('../models/userSchema');
const Mensaje = require('../models/messageSchema');
const usuarioConectado =async(uid) => {
    const usuario = await Usuario.findById(uid);

    usuario.online = true;
    await usuario.save();
    return usuario;
}
const desconectadoConectado =async(uid) => {
    const usuario = await Usuario.findById(uid);

    usuario.online = false;
    await usuario.save();
    return usuario;
}
const getUsuarios = async() => {
    const usuarios = await Usuario.find().sort('online');

    return usuarios;
}
const guardarMensaje = async(payload) => {
    try {
        const mensaje = new Mensaje(payload);
        await mensaje.save();

        return mensaje;
    } catch (error) {
        console.log(error)
        return false;
        
    }
}
module.exports = {usuarioConectado,
    getUsuarios,
    guardarMensaje,
    desconectadoConectado}
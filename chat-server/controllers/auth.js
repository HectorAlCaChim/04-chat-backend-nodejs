const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt-helper');
const Usuario = require('../models/userSchema')

const createUser = async(req, res ) => {
    try {
        const { email, password } = req.body;
        const existeEmail = await Usuario.findOne({ email});

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo existe'
            }); 
        }
        const usuario = new Usuario(req.body);
        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        //guardar
        await usuario.save();

        //GENERAR JWT 
        const token = await generateJWT(usuario.id);

        res.json({
            ok: true,
            usuario: usuario,
            token: token
        }); 

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });   
    }
}

const loginUser = async(req, res ) => {
    const { email, password } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ email});
        console.log(usuarioDB, password)
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario o email incorrecto'
            }); 
        }
        const validPassowrd = await bcrypt.compareSync(password, usuarioDB.password);
        console.log('SDAS', validPassowrd)
        if (!validPassowrd) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario o email incorrecto'
            }); 
        } 
            //GENERAR JWT 
            const token = await generateJWT(usuarioDB.id);
            res.json({
                ok: true,
                usuario: usuarioDB,
                token: token
            });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        }); 
    }
}

const renewUser = async(req, res ) => {
    const uid = req.uid;
    // generar web token
    const token = await generateJWT(uid);
    // obtener usuario por uid
    const usuario = await Usuario.findById(uid);
    res.json({
        ok: true,
        usuario: usuario,
        token: token
    });
}

module.exports = {
    createUser,
    loginUser,
    renewUser
}
const Mensaje = require('../models/messageSchema')
const getChat = async(req, res) => {
    console.log('obtener char')
    const id = req.uid;
    const messageTo = req.params.from;

    const last30 = await Mensaje.find({
        $or:[
            {de: id, para: messageTo},
            {de: messageTo, para: id},
        ]
    }).sort({
        createdAt: 'asc'
    }).limit(30)


    res.json({
        ok: true,
        messages: last30
    })
}

module.exports = {getChat}
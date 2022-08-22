const jwt = require('jsonwebtoken')
const generateJWT = (uid) => {

    return new Promise( (resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '3h'
        }, ( err, token) => {
            if (err) {
                console.log(err)
                reject('faild generate token')
            } else {
                resolve(token);
            }
        });
    });
}
const comprobarJWT = (token = '') => {
    try {
        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid]
    } catch (error) {
        console.log(error)
        return [false, null]
    }
}
module.exports = {
    generateJWT,
    comprobarJWT
}
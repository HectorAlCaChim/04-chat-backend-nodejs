const jwt = require('jsonwebtoken')
const validationJWT = (req, res, next) => {
    try {
        const token = req.header('token');

        if (!token ) {
            return res.status(401).json({
                ok: false,
                msg: 'There is not token'
            });
        }
        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid
        next();
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'invalid token'
        });
    }
}
module.exports = {
    validationJWT
}
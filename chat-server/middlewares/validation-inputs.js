const { validationResult } = require('express-validator');
const validatEntradas = (req, res, next) => {
    const errores = validationResult(req);
    if (errores.errors.length > 0) {
        return res.status(400).json({
            ok: false,
            errors: errores.errors
        })
    }
    next();
}
module.exports = { validatEntradas }
const { Router } = require('express');
const { check } = require('express-validator')
const { createUser, loginUser, renewUser } = require('../controllers/auth');
const { validatEntradas } = require('../middlewares/validation-inputs');
const { validationJWT } = require('../middlewares/validation-jwt');
const router = Router();

router.post('/new',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validatEntradas,
], createUser);

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validatEntradas,
],loginUser);

router.get('/renew', validationJWT, renewUser);

module.exports = router;
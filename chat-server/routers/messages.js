const {Router} = require('express');
const { getChat } = require('../controllers/message')
const { validationJWT } = require('../middlewares/validation-jwt');
const router = Router();

router.get('/:from', validationJWT, getChat);

module.exports = router;
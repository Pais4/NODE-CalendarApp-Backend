/* 
    RUTAS DE USUARIOS / AUTH
    api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { createUser, userLogin, renewToken } = require('../controllers/authController');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/* COMO QUEREMOS IMPLEMENTAR VARIOS MIDDLEWARES LO PONEMOS ENTRE LLAVES */
router.post(
    '/register', 
    [
        /* MIDDLEWARES */
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe contener minimo 6 caracteres').isLength({ min: 6 }),
        /* IMPLEMENTAMOS EL CUSTOM MIDDLEWARE */
        validarCampos
    ], 
    createUser
);

router.post(
    '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe contener minimo 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    userLogin 
);

router.get(
    '/renew',
    /* SI SOLO ES UN MIDDLEWARE LO PODEMOS MANDAR DE ESTA MANERA */
    validarJWT,
     renewToken 
);

module.exports = router;


/* ANOTACIONES */
/*
 * -> Check -> Es el middleware que se va a encargar de validar un campo en particular, uno
 * a la vez.
 * 
 */
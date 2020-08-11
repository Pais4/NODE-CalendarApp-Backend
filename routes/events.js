/* 
    RUTAS DE EVENTOS / EVENTS
    /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
 
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventsController');

const router = Router();

/* PARA NO PONER EL MIDDLEWARE EN CADA PETICION, LO ESCALAMOS PARA QUE TODAS PASEN POR EL 
MISMO, CUALQUIER PETICION QUE SE ENCUENTRE ABAJO DE ESTO, VA A TENER QUE TENER SU TOKEN */
router.use( validarJWT );

/* OBTENER EVENTOS */
router.get(
    '/',
    getEvents
)

/* CREAR NUEVO EVENTO */
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion obligatoria').custom( isDate ),
        validarCampos
    ],
    createEvent
)

/* ACTUALIZAR EVENTO */
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion obligatoria').custom( isDate ),
        validarCampos
    ],
    updateEvent
)

/* BORRAR EVENTO */
router.delete(
    '/:id',
    deleteEvent
)

module.exports = router;

/* ANOTACIONES */
/*
 * -> CHECK -> CUSTOM: Espera que le mandemos una funcion (callback) que se va a ejecutar
 * para validar el campo.
 * 
 */
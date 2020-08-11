/* CUSTOM MIDDLEWARE */

const { response } = require('express');
const { validationResult } = require('express-validator');

/* EL NEXT ES UN CALLBACK */
const validarCampos = ( req, res = response , next ) => {
    
    /* MANEJO DE ERRORES */
    const errors = validationResult( req );
    // console.log(errors)

    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    /* SI NO HAY NINGUN ERROR LLAMAMOS AL NEXT */
    next();

}

module.exports = {
    validarCampos
}

/* ANOTACIONES */
/*
 * -> next: Es una funcion que tenemos que llamar si el middleware se ejecuta correctamente
 * 
 */
const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next ) => {

    /* X-TOKEN -> HEADERS */
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false, 
            msg: 'No hay token en la peticion'
        });
    }

    try {
        
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        /* AQUI LE IMPLEMENTAMOS ESTOS VALORES AL REQ, PARA PASARSELOS AL CONTROLADOR */
        req.uid = uid;
        req.name = name;

    } catch (error) {

        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })

    }

    next();

}

module.exports = {
    validarJWT
}

/* ANOTACIONES */
/*
 * -> Existe un estandar a la hora de mandar headers personalizados, cuando son asi, debemos 
 * poner una x antes del nombre -> x-token 
 * 
 */
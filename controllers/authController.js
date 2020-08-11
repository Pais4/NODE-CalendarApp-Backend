const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const { generarJWT } = require('../helpers/jwt')

/* EL CALLBACK SE DISPARA CON VARIOS ARGUMENTOS -> REQ, RES */
/* IGUALAMOS EL RES AL RESPONSE PARA TENER EL INTELLISENSE NADA MAS */
const createUser = async(req, res = response) => {

    const { email, password } = req.body; 

    try {

        /* REVISAR SI YA EXISTE EL CORREO */
        let user = await User.findOne({ email });

        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo'
            });
        }
        
        user = new User( req.body );

        /* ENCRIPTAR CONTRASEÑA */
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt);
    
        await user.save();

        /* GENERAR JWT */
        const token = await generarJWT( user.id, user.name )
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}

const userLogin = async(req, res = response ) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario con ese Email no existe'
            });
        }

        /* CONFIRMAR LOS PASSWORD */
        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        /* GENERAR JWT */
        const token = await generarJWT( user.id, user.name )

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }

}

const renewToken = async (req, res = response ) => {

    const { uid, name } = req;

    try {

        const token = await generarJWT( uid, name );

        res.status(201).json({
            ok: true,
            token
        })


    } catch (error) {
        
        console.log(error)

        res.status(400).json({
            ok: false,
            msg: 'No se pudo generar el nuevo token'
        })

    }

}

module.exports = {
    createUser,
    userLogin,
    renewToken
}
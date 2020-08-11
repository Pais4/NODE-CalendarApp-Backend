const { response } = require('express');
const Event = require('../models/EventModel');

const getEvents = async( req, res = response ) => {

    /* POPULATE PARA QUE DEVUELVA LOS DATOS CON LA INFORMACION DEL USUARIO Y EL NAME PARA
    QUE SOLO DEVUELVA EL NAME, EL ID SIEMPRE LO DEVUELVE */
    const events = await Event.find().populate('user', 'name email');

    res.status(200).json({
        ok: true,
        events
    })

}

const createEvent = async( req, res = response ) => {

    const event = new Event( req.body );

    try {

        event.user = req.uid;
        
        const eventSaved = await event.save();

        res.json({
            ok: true,
            event: eventSaved
        })

    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
    
}

const updateEvent = async ( req, res = response ) => {

    const eventId = req.params.id;
    const { uid } = req;

    try {
        
        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese ID'
            });
        }

        /* NECESITAMOS PASARLO A UN STRING PARA COMPARARLO */
        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para editar este evento'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        /* PARA QUE NOS MANDE LA ULTIMA INFORMACION ACTUALIZADA LE MANDAMOS NEW: TRUE PARA
        QUE RETORNE LOS DATOS ACTUALIZADOS */
        const eventUpdated = await Event.findByIdAndUpdate( eventId, newEvent, { new: true });

        res.status(200).json({
            ok: true,
            event: eventUpdated
        })

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
    
}

const deleteEvent = async( req, res = response ) => {

    const eventId = req.params.id;
    const { uid } = req;

    try {
        
        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese ID'
            });
        }

        /* NECESITAMOS PASARLO A UN STRING PARA COMPARARLO */
        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para eliminar este evento'
            })
        }

        await Event.findByIdAndDelete( eventId );

        res.status(200).json({
            ok: true,
            msg: 'Evento eliminado correctamente'
        })

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
    
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
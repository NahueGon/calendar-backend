const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async( req, res = response ) => {

    const events = await Event.find()
                                .populate('user', 'name');
        
    return res.json({
        ok: true,
        events
    })
}

const createEvent = async( req, res = response ) => {

    const event = new Event( req.body );

    try {

        event.user = req.uid;

        const saveEvent = await event.save();

        return res.json({
            ok: true,
            event: saveEvent
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const updateEvent = async( req, res = response ) => {

    const idEvent = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(idEvent);

        if ( !event ) {
            res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese ID'
            })
        }

        if ( event.user.toString() !== uid ) {
            return res.status(404).json({
                ok: false,
                msg: 'No tiene el privilegio de editar este evento'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate( idEvent, newEvent, { new: true } );

        res.json({
            ok: true,
            event: updatedEvent
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const deleteEvent = async( req, res = response ) => {

    const idEvent = req.params.id;
    const uid = req.uid;

    try {
        
        const event = await Event.findById(idEvent);

        if ( !event ) {
            res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese ID'
            })
        }

        if ( event.user.toString() !== uid ) {
            return res.status(404).json({
                ok: false,
                msg: 'No tiene el privilegio de eliminar este evento'
            })
        }

        await Event.findByIdAndDelete( idEvent );

        res.json({
            ok: true,
            msg: 'Evento eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
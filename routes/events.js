/*
    Events Routes / Events
    host + /api/events/
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { jwtValidator } = require('../middlewares/jwtValidator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

// All of them have to go through JWT validation.
router.use( jwtValidator );

// Get Events
router.get('/', getEvents);

// Create a new Event
router.post(
    '/',
    [ // middlewares
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalizacion es obligatoria').custom( isDate ),
        fieldsValidator
    ],
    createEvent
);

// update Event
router.put(
    '/:id', 
    [ // middlewares
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalizacion es obligatoria').custom( isDate ),
        fieldsValidator
    ],
    updateEvent
);

// delete Event
router.delete('/:id', deleteEvent);

module.exports =  router;
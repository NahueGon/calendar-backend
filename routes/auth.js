/*
    Users Routes / Auth
    host + /api/auth/
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { jwtValidator } = require('../middlewares/jwtValidator');

const router = Router();

router.post(
    '/new',
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña de tener mas de 6 caracteres').isLength({ min: 6 }),
        fieldsValidator
    ],
    createUser
);

router.post(
    '/',
    [ // middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña de tener mas de 6 caracteres').isLength({ min: 6 }),
        fieldsValidator
    ],
    loginUser
);

router.get('/renew', jwtValidator, revalidateToken);

module.exports =  router;
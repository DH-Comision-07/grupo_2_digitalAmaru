

const { check } = require('express-validator');

module.exports =  { 
    //check('email').isEmail().withMessage('Email inválido'),
    //check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    register: [
        check('email').isEmail().withMessage('Email inválido'),
        check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    ]
}




const { check } = require('express-validator');

const registerValidations = [
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
];

module.exports = registerValidations;
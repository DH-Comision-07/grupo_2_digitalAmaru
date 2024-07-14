const { body } = require('express-validator');

const userValidations = {
    register: [
        body("name")
            .notEmpty().withMessage('Debes ingresar tu nombre.')
            .matches(/^[A-Za-z\s]+$/).withMessage('El nombre solo debe contener letras y espacios'),
        body("email")
            .notEmpty().withMessage('Debes ingresar tu email.')
            .isEmail().withMessage('Debes ingresar un email válido.'),
        body("password")
            .isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres.')
    ],
    login: [
        body("email")
            .notEmpty().withMessage('Debes ingresar tu email.')
            .isEmail().withMessage('Debes ingresar un email válido.'),
        body("password")
            .notEmpty().withMessage('Debes ingresar tu contraseña.')
    ],
    productCreate: [
        body("name")
            .notEmpty().withMessage('Debes ingresar el nombre del producto.'),
        body("description")
            .notEmpty().withMessage('Debes ingresar una descripción.')
            .isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres.'),
        body("price")
            .notEmpty().withMessage('Debes ingresar un precio.')
            .isFloat({ gt: 0 }).withMessage('El precio debe ser un número positivo.')
    ]
};

module.exports = userValidations;

const { name } = require('ejs');
const {body, check} = require ('express-validator');

module.exports = {
    register: [
        body("name")
            .notEmpty()
            .withMessage('Debes ingresar tu nombre.')
            .isLength({min:4, max:20})
    ],
    login: [
        body("email")
            .notEmpty()
            .withMessage('Debes ingresar tu email.')
            
    ]
}
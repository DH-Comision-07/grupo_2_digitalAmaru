const { name } = require('ejs');
const {body, check} = require ('express-validator');

module.exports = {
    register: [
        body("name")
            .notEmpty()
            .withMessage('Debes ingresar tu nombre.')
            .isLength({min:4, max:20}),
    //    body("password")
      //      .isLength({ min: 4 })
     //       .withMessage('La contraseña debe tener al menos 8 caracteres')
    ],
    login: [
        body("email")
            .notEmpty()
            .withMessage('Debes ingresar tu email.')
            
    ]
}
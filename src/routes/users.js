const express = require('express');
const router = express.Router();
const session = require('express-session');
const userController = require('../controllers/userController');
router.get("/", userController.user);
const userValidations = require('../middlewers/validations');


router.get("/register", userController.register);

//router.post("/register", userValidations.register, userController.prosesRegister);
router.post("/register", userController.prosesRegister);

router.get("/login", userController.login);

router.post('/login', userValidations.login, userController.procesLogin);

router.get("/perfil", userController.perfil)

module.exports = router;
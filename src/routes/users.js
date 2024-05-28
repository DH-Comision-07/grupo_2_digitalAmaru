const express = require('express');
const router = express.Router();
const session = require('express-session');
const userController = require('../controllers/userController');
router.get("/", userController.user);
const userValidations = require('../middlewers/validations');
const guestmiddlewers = require("../middlewers/guestMiddlewers");
const autMiddlewers = require("../middlewers/autMiddleweres");

router.get("/register", guestmiddlewers, userController.register);

//router.post("/register", userValidations.register, userController.prosesRegister);
router.post("/register", userController.prosesRegister);

router.get("/login" , guestmiddlewers, userController.login);

router.post('/login', userValidations.login, userController.procesLogin);

router.get("/perfil", autMiddlewers, userController.perfil);

router.get("/logout", userController.logout)

module.exports = router;
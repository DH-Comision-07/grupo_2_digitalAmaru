const express = require('express');
const router = express.Router();
const session = require('express-session');
const userController = require('../controllers/userController');
router.get("/", userController.user);
const { loginValidations } = require('../services/validations');

router.get("/register", userController.register);

router.post("/register", userController.create);

router.get("/login", userController.login);

router.post('/login', loginValidations, userController.processLogin);

router.get("/userList", userController.userList)


module.exports = router;
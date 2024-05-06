const express = require('express');
const router = express.Router();
const session = require('express-session');
const userController = require('../controllers/userController');
router.get("/", userController.user);


router.get("/register", userController.register);

router.post("/register", userController.create);

router.get("/login", userController.login);

router.post("/login",[
    check("email").isEmail().withMessage("Email invalido"),
    check("password").isLength({min: 8}).withMessage("La contraseña deve tener almenos 8 caracteres")
], userController.processLogin)

router.get("/userList", userController.userList)


module.exports = router;
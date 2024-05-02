const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.get("/", userController.user);


router.get("/register", userController.register);

router.post("/register", userController.create);

router.get("/login", userController.login);

router.get("/userList", userController.userList)



module.exports = router;
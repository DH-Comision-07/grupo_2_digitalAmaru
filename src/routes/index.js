const express = require('express');
const router = express.Router();
const session = require('express-session');
const indexController = require('../controllers/indexController');

router.get("/", indexController.index);

module.exports = router;



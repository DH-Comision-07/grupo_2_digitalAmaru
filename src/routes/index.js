const express = require('express');
const router = express.Router();
const session = require('express-session');
const indexController = require('../controllers/indexController');

router.get("/", indexController.index);

// ruta a nosotros
router.get("/nosotros", indexController.nosotros)




module.exports = router;



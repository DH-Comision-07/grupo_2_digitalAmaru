const express = require('express');
const router = express.Router();
const session = require('express-session');
const indexController = require('../controllersNew/indexController');

router.get("/", indexController.index);
// ruta a blog
router.get("/blog", indexController.blog);

router.get("/nosotros", indexController.nosotros)

module.exports = router;


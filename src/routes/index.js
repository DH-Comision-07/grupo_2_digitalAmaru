const express = require('express');
const router = express.Router();
const session = require('express-session');
const indexController = require('../controllers/indexController');

router.get("/", indexController.index);

// ruta a blog
router.get("/blog", indexController.blog);




module.exports = router;



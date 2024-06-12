
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');



router.get("/cursos/detalle/:id", productController.productById)

//router.post("/cursos", productController)

module.exports = router;
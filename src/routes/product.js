
const express = require('express');
const router = express.Router();
const productController = require('../controllersNew/productController');
const userValidations = require('../middlewers/validations');

router.get("/detalle/:id", productController.productById)

router.get('/crearueditar', productController.create)
router.post('/crearueditar', productController.creationStore)
//router.get('/edit', productController.creationProduct);

router.get('/edit/:id', productController.edit); // Ruta para obtener el producto a editar
router.put('/edit/:id', productController.updateProduct)
router.delete('/delete/:id', productController.delete)

// cart
//router.get('/cartAdd', productController.viewCart);
//router.post('/add', productController.addToCart);

//router.post("/cursos", productController);

module.exports = router;
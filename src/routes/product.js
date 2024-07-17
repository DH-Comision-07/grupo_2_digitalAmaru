
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const userValidations = require('../middlewers/validations');

router.get("/cursos/detalle/:id", productController.productById)

router.get('/crearueditar', productController.editionCreate)
//editCReate

router.get('/edit', productController.creationProduct);
router.get('/edit/:id', productController.editProduct); // Ruta para obtener el producto a editar
router.post('/create', userValidations.productCreate, productController.createProduct); // Ruta para crear un nuevo producto
router.post('/edit/:id', userValidations.productCreate, productController.updateProduct); // Ruta para actualizar el producto

// cart
router.get('/cartAdd', productController.viewCart);
router.post('/add', productController.addToCart);

//router.post("/cursos", productController);

module.exports = router;
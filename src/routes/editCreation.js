const express = require('express');
const router = express.Router();
const editCreationController = require('../controllers/editCreationControler')
const userValidations = require('../middlewers/validations');

router.get('/edit', editCreationController.creationProduct);
router.get('/edit/:id', editCreationController.editProduct); // Ruta para obtener el producto a editar
router.post('/create', userValidations.productCreate, editCreationController.createProduct); // Ruta para crear un nuevo producto
router.post('/edit/:id', userValidations.productCreate, editCreationController.updateProduct); // Ruta para actualizar el producto

module.exports = router;

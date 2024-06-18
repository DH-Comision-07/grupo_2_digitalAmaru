const express = require('express');
const router = express.Router();
const editCreationController = require('../controllers/editCreationControler');

router.get('/edit', editCreationController.creationProduct);
router.get('/edit/:id', editCreationController.editProduct); // Ruta para obtener el producto a editar
router.post('/create', editCreationController.createProduct); // Ruta para crear un nuevo producto
router.post('/edit/:id', editCreationController.updateProduct); // Ruta para actualizar el producto

module.exports = router;

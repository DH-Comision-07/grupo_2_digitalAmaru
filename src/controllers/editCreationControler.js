const path = require("path");
const fs = require('fs');
const { validationResult } = require('express-validator');
const productsFilePath = path.join(__dirname, '../database/products.json');
const arrayCursos = require(productsFilePath);

const editCreationController = {
    creationProduct: (req, res) => {
        res.render('editionProducts', { products: arrayCursos });
    },
    editProduct: (req, res) => {
        const productId = parseInt(req.params.id);
        const product = arrayCursos.find(p => p.id === productId);
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        res.render('editproducts/editProduct', { product });
    },
    createProduct: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('editionProducts', {
                products: arrayCursos,
                errors: errors.array(),
                oldData: req.body
            });
        }

        const maxIdProduct = arrayCursos.length ? Math.max(...arrayCursos.map(product => product.id)) : 0;
        const newProduct = {
            id: maxIdProduct + 1,
            name: req.body.name,
            description: req.body.description,
            image: req.body.image || '',
            price: req.body.price
        };
        
        arrayCursos.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(arrayCursos, null, 2));
        res.redirect('/editCreation/edit');
    },
    updateProduct: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const product = arrayCursos.find(p => p.id === parseInt(req.params.id));
            return res.render('editproducts/editProduct', {
                product,
                errors: errors.array(),
                oldData: req.body
            });
        }

        const productId = parseInt(req.params.id);
        const productIndex = arrayCursos.findIndex(p => p.id === productId);
        if (productIndex === -1) {
            return res.status(404).send('Producto no encontrado');
        }

        arrayCursos[productIndex] = {
            id: productId,
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price
        };

        fs.writeFileSync(productsFilePath, JSON.stringify(arrayCursos, null, 2));
        res.redirect('/editCreation/edit');
    }
};

module.exports = editCreationController;

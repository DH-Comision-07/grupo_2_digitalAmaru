const path = require("path");
const fs = require('fs');
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
        const newProduct = {
            id: Date.now(), 
            // genera un id
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

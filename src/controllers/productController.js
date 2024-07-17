const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator');
const productsFilePath = path.join(__dirname, '../database/products.json');
const arrayCursos = require(productsFilePath);


const productController = {   
    productData: function(){ 
        return JSON.parse(fs.readFileSync(path.resolve(__dirname,  "../database/products.json")));
    },

    productById: function (req, res) {
        let cursos = JSON.parse(fs.readFileSync(path.resolve(__dirname,  "../database/products.json")));
        let products = cursos.find(curso => curso.id == req.params.id);
        return res.render('product-details', { products });
    },

    editionCreate: function(req, res){ 
        return res.render('editionProducts');
    },

    // editCrrate

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
    },

    //cart
    viewCart: (req, res) => {
        const cart = req.session.cart || [];
        res.render('cart', { cart });
    },

    addToCart: (req, res) => {
        const { id } = req.body;
        const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../database/products.json"), 'utf-8'));
        const product = products.find(p => p.id == id);

        if (!req.session.cart) {
            req.session.cart = [];
        }

        if (product) {
            const cartItem = req.session.cart.find(item => item.id == id);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                req.session.cart.push({ ...product, quantity: 1 });
            }
        }

        res.redirect('/cart/cartAdd');
    }
};

module.exports = productController;

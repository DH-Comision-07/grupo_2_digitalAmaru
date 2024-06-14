const fs = require("fs");
const path = require("path");

const cartController = {
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

module.exports = cartController;

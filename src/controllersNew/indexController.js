const db = require('../db/models');

const indexController = {
    index: async function(req, res) {
        try {
            let products = await db.Product.findAll(); // Cambia 'Product' al nombre de tu modelo

            res.render('index', {
                products: products
            });
            
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener los productos');
        }
    },

    nosotros: function(req, res) {
        res.render("nosotros");
    },

    blog: function(req, res) {
        res.render("blog");
    }
};

module.exports = indexController;

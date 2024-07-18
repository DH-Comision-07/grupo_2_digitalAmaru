const { productById } = require('../controllers/productController');
const db = require('../db/models');

const productController = {
    productById: async function(req, res) {
        try {
            let product = await db.Product.findByPk(req.params.id); // Cambia 'Product' al nombre de tu modelo

            res.render('product-details', {
                product: product
            });
            
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener los productos');
        }
    }
};

module.exports = productController;

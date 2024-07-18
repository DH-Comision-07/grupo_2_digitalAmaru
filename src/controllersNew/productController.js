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
    },
    editionCreate: function(req, res){ 
            return res.render('editionProducts');
    },
    creationProduct: async function (req, res) {
        try {
            let product = await db.Product.findByPk(req.params.id); // Cambia 'Product' al nombre de tu modelo

            res.render('product-details', {
                product: product
            });
            
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener los productos');
        }
    },
    editProduct : async function (req, res) { 
    let product = await db.Product.findByPk(req.params.id)
        .then(function(product){
            res.render('editproducts/editProduct',{product: product})
        })
    
    .catch(function (req, res) {
        return res.status(404).send('Producto no encontrado');
        }
    )
        
   
},
create: function (req, res) {
    db.product.create({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        name_teacher: req.body.name_teacher
    })
    res.render('index')
},
updateProduct: function (req, res) {
    db.peliculas.update({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        name_teacher: req.body.name_teacher
    },
    {
    where: {
        id: req.params.id
        }
    })
    res.redirect('/product/crearueditar')
}

    
};

module.exports = productController;

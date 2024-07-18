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
    create: function(req, res){ 
         res.render('editionProducts');
    },
    creationStore: async function (req, res) {
        console.log(req.body)
        try {
     await db.Product.create({
        ...req.body
     }); // Cambia 'Product' al nombre de tu modelo
           res.redirect('/')
            
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener los productos');
        }
    },        

edit: async (req, res) => {
    try {
        let product = await db.Product.findByPk(req.params.id);
        res.render('editProduct', { product:product})
    } catch (error) {
        console.log(error)
    }


},
updateProduct: async function (req, res) {
    console.log(req.body)
    let productoeditado = await db.Product.findByPk(req.params.id)
   await productoeditado.update({
    ...req.body
    }),
    res.redirect('/')
},
delete:async function(req, res){
    try {
       const  product = await db.Product.findByPk(req.params.id)
       await product.destroy()
       res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}

    
};

module.exports = productController;

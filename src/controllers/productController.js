const fs = require("fs");
const path = require("path");

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
    }
};

module.exports = productController;

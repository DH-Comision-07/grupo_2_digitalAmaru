let fs = require("fs");
const path = require("path");


const productController = {   
    productData: function(){ 
        return JSON.parse(fs.readFileSync(path.resolve(__dirname,  "../database/products.json")));
    },

    productById: function (req, res) {
        let cursos = JSON.parse(fs.readFileSync(path.resolve(__dirname,  "../database/products.json")));
        
        let curso = cursos.find(curso => curso.id == req.params.id);
        console.log(curso);
        return res.render('product-details', {curso});
    }
    
    
};


module.exports = productController;
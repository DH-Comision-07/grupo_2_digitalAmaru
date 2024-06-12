const arrayCursos = require("../../src/database/products.json");
const arrayTitulos = require("../../public/jsvaScript/titulos");


const indexController = {
    index: function(req, res) {
        let products = arrayCursos;
        let titulos = arrayTitulos;
        res.render('index',
        {"products": products
        });
    },

    
};

module.exports = indexController; 
let fs = require("fs");
const path = require("path");

const cartController = {
    cartComplete: function (req, res) {
        const cart = req.session.cart || [];
    res.render('cart', { cart });
        return res.render("cart")
    },
    allCursos: function(){ 
        return JSON.parse(fs.readFileSync(path.resolve(__dirname,  "../database/products.json")));
    },
    cartCompleteById: function(req, res) {
        let cursos = JSON.parse(fs.readFileSync(path.resolve(__dirname,  "../database/products.json")));
        
        let cursoCarrito = cursos.find(curso => curso.id == req.params.id);
        console.log(cursoCarrito);

        if (!cursoCarrito) {
            return res.status(404).send('Producto no encontrado');
        }
    
        if (!req.session.cart) {
            req.session.cart = [];
        }
    
        req.session.cart.push(cursoCarrito);
        res.redirect('/cart');
    }
    
    // Ruta para mostrar el carrito
    
    
}
module.exports = cartController;
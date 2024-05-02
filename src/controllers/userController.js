let fs = require("fs");

const userController = {

    'register' : function (req, res) {
        res.render("register");
    },
    'login' : function (req, res){
        res.render("login");
    },
    'userList' : function (req, res) {
        res.render("userList")
    },
    user: function(req,res){
        res.render('user');
    },
    create: function(req, res) {
        let usuario = {
            nombre: req.body.nombre,
            email: req.body.email,
            contraseña: req.body.contraseña
        }
        let usuarioJSON = JESON.stringify(usuario);

        fs.writeFileSync("usuarios.json" , usuarioJSON)
    }
};
 
module.exports = userController;
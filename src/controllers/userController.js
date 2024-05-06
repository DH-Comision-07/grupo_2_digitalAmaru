let fs = require("fs");
const session = require('express-session');

const userController = {

    register : function (req, res) {
        return res.render("register");
    },
    login : function (req, res){
        return res.render("login");
    },
    processLogin : function (req, res) {
        let errors = validationResult(req);

        if (errors.isEmpty()){
            let usersJSON = fs.readFileSync('users.json', errors);
            let users;
            if (usersJSON = "") {
                users = [];
            } else {
                users = JSON.parse(usersJSON);
            }

            for (let i = 0; i < users.length; i++) {
                if (users[i].email == req.body.email) {
                    if (bcrypt.compareSync(req.body.password, users[i].password)) {
                        let usuarioALoguearse = users[i];
                        break;
                    }
                }
            }

            if (usuarioALoguearse == undefined) {
                return res.render("login", {errors: [
                    {msg: 'Credenciales invalidas'}
                ]})
            }
            req.session.usuarioLogueado = usuarioALoguearse;
        } else {
            return res.render("login", {errors: errors.errors})
        }
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
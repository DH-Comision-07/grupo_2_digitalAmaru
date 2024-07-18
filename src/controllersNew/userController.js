const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const db = require('../db/models');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            console.log(db.usuarios);
            const users = await db.usuarios.findAll();
            return res.send(users);
        } catch (error) {
            return res.status(500).send(error);
        }
    },

    register: (req, res) => {
        return res.render("register");
    },

    prosesRegister: async (req, res) => {
            try {
                console.log(req.body)
         await db.usuarios.create({
            ...req.body
         }); // Cambia 'User' al nombre de tu modelo
               res.redirect('/')
                
            } catch (error) {
                console.error(error);
                res.status(500).send('Error al obtener los usuarios');
            }     
    },

login: (req, res) => {
        return res.render("login");
    },

    procesLogin: async (req, res) => {
        let userToLogin = await db.User.findOne({ where: { mail: req.body.mail } });

        if (userToLogin) {
            let passwordOk = bcryptjs.compareSync(req.body.contraseña, userToLogin.contraseña);
            if (passwordOk) {
                delete userToLogin.contraseña;
                req.session.userLogged = userToLogin;

                if (req.body.rememberme) {
                    res.cookie('userEmail', req.body.mail, { maxAge: 1000 * 60 * 60 * 24 * 30 });
                }
                return res.redirect("/user/perfil");
            }
            return res.render("login", {
                errors: {
                    email: {
                        msg: 'La contraseña es incorrecta'
                    }
                }
            });
        }

        return res.render("login", {
            errors: {
                email: {
                    msg: 'No encontramos este email en nuestra base de datos, por favor regístrate o intenta nuevamente con otro'
                }
            }
        });
    },

    perfil: (req, res) => {
        return res.render("perfil", {
            user: req.session.userLogged
        });
    },

    logout: (req, res) => {
        req.session.destroy();
        res.redirect("/");
    },

    welcome: (req, res) => {
        return res.render('bienvenida');
    },

    welcomeToLogin: (req, res) => {
        return res.render('login');
    }
};

module.exports = userController;
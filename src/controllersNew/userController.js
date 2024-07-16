const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const db = require('../db/models');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await db.User.findAll();
            return res.send(users);
        } catch (error) {
            return res.status(500).send(error);
        }
    },

    register: (req, res) => {
        return res.render("register");
    },

    prosesRegister: async (req, res) => {
        const errorsReg = validationResult(req);

        // Verificar si el email ya está en uso
        let userComparationEmail = await db.User.findOne({ where: { mail: req.body.mail } });
        if (userComparationEmail) {
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'Este email ya está en uso, intenta con otro'
                    }
                }
            });
        }

        if (errorsReg.isEmpty()) {
            let userHashed = {
                ...req.body,
                contraseña: bcryptjs.hashSync(req.body.contraseña, 12)
            };

            await db.User.create(userHashed);
            res.redirect("/user/welcome");
        } else {
            return res.render('register', {
                errors: errorsReg.mapped(),
                oldData: req.body
            });
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
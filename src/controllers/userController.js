let fs = require("fs");
const session = require('express-session');
const { resolve } = require("path");
const { validationResult } = require("express-validator");
const  { body } = require("express-validator")
const bcryptjs = require("bcryptjs");
const userService = require("../models/User");
const { isUtf8 } = require("buffer");
const { log } = require("console");




const userController = {

    register : function (req, res) {
        return res.render("register");
    },
    prosesRegister: function(req, res) {
        const errorsReg = validationResult(req);
        // comparacion de email para no registrar mas de una vez ese email
        let userComparationEmail = userService.findByParam('email', req.body.email);
        if (userComparationEmail) { 
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'Este email ya esta en uso, intenta con otro'
                    }
                }
            });

        }  
        
        if (errorsReg.errors.length == 0) {
            
            let userHashed = {
                ...req.body,
                password: bcryptjs.hashSync(req.body.password, 12)
            }

            let usuarioCreado =  userService.create(userHashed);
            res.redirect("/user/login");
            
        } else { 
            return errorsReg
        }
    

        
    },



    login : function (req, res){
        return res.render("login");
    },
    procesLogin : function (req, res) {
        let userToLogin = userService.findByParam('email', req.body.email);
        
        if (userToLogin){
            let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            console.log(passwordOk);
            if (passwordOk) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if (req.body.rememberme) {
                    res.cookie('userEmail', req.body.email, { maxAge: (((1000 * 60)* 60) * 24) * 30})
                    
                }
                return res.redirect("/user/perfil")
            }
            return res.render("login", {
                errors: {
                    email: {
                        msg: 'La contraseña es incorrecta'
                    }
                }
            })
        }

        return res.render("login", {
            errors: {
                email: {
                    msg: 'No encontramos este email en nuesra base de datos por favor registrese o intente nuevamente con otro'
                }
            }
        })
    },



    prosesologanterior: function(){
        let validationResult = {};
        let errors = validationResult.req;
        if (!errors.isEmpty()){
            return res.render("login", {errors: errors.errors})
        } else { 
            let users = JSON.parse(fs.readFileSync( resolve(__dirname, '../data/users.json')));

            for (let i = 0; i < users.length; i++) {
                if (users[i].email == req.body.email) {
                    let usuarioALoguearse = users[i];
                    break;
                }
            }

            if (!usuarioALoguearse) {
                return res.render("login", {errors: {msg: "El usuario no se encuentra registrado"}})
            } 

            if (bcryptjs.compareSync(req.body.password, users[i].password)){
                delete usuarioALoguearse.password
                req.session.usuarioLogueado = usuarioALoguearse;

                if (req.body.rememberme) {
                    res.cookie("userEmail", req.body.email,  {maxAge : (((1000 * 60) * 60)*24)})
                }

                return res.render("login", {errors: {msg: "La contraseña no se encuentra registrada"}})
            }

            
            if (usuarioALoguearse == undefined) {
                return res.render("login", {errors: [
                    {msg: 'Credenciales invalidas, vuelva a intentarlo'}
                ]})
            }
        }   
        
    },
    user: function(req,res){
       
    },
    perfil: (req,res) => {
        console.log(req.cookies.userEmail);
       return res.render("perfil", {
        user: req.session.userLogged
       });
   },
   logout: (req, res) => {
        req.session.destroy();
        res.redirect("/")
   }
    
};
module.exports = userController;
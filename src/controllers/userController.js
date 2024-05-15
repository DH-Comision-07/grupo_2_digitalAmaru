let fs = require("fs");
const session = require('express-session');
const { resolve } = require("path");
const { validationResult } = require("express-validator");
const { body } = require("express-validator")
const bcrypt = require("bcryptjs");
const theUser = require("../models/User");
const { isUtf8 } = require("buffer");




const userController = {

    register : function (req, res) {
        return res.render("register");
    },
    prosesRegister: function(req, res) {
        const errorsReg = validationResult(req);

        if (errorsReg.isEmpty()) {
            theUser.create(req.body);
            return res.render("register");
            
        } else { 
            return errorsReg
        }
    },



    login : function (req, res){
        return res.render("login");
    },
    procesLogin : function (req, res) {
        let validationResult = {};
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.render("login", {errors: errors.errors, old: req.body})
        } else { 
            let users = JSON.parse(fs.readFileSync( resolve(__dirname, '../data/users.json'), "utf-8"));

            for (let i = 0; i < users.length; i++) {
                if (users[i].email == req.body.email) {
                    let usuarioALoguearse = users[i];
                    break;
                }
            }

            if (!usuarioALoguearse) {
                return res.render("login", {errors: {msg: "El usuario no se encuentra registrado"}})
            } 

            if (bcrypt.compareSync(req.body.password, users[i].password)){
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
    
};
module.exports = userController;
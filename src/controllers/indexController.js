let fs = require("fs");
const session = require('express-session');
const { resolve } = require("path");
const { validationResult } = require("express-validator");
const { body } = require("express-validator")
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { isUtf8 } = require("buffer");
const arrayCursos = require("../../src/database/products.json");
const arrayTitulos = require("../../public/jsvaScript/titulos");
const indexController = {
    index: function(req, res) {
        let products = arrayCursos;
        let titulos = arrayTitulos;
        res.render('index',
        {"products": products,
        "titulos": titulos});
    },

    
};

module.exports = indexController; 
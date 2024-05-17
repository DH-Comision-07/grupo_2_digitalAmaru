const fs = require("fs");
const {body, check} = require ('express-validator');
const path = require("path");
const bcrypt = require("bcryptjs");
const { isUtf8 } = require("buffer");


const theUser = {

    fileName: '../database/users.json',


    getData: function(){
       return  JSON.parse(fs.readFileSync(path.resolve(__dirname,this.fileName), 'utf-8'));
        
    },
    

    //generamos id
    generateId : function () {
        let allUsers = this.findAll();
        let lastId = allUsers.pop();
        if (lastId){
            return lastId.id + 1;
        }
        return  1;
    },

    findAll: function () {
        return this.getData();
    },

    //usuarios por id
    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound
    },

    //trae usuarios por parametro y valor
    findByParam: function (parametro, texto){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[parametro] === texto);
        return userFound
    },

    create: function (userData) {
        let allUsers = this.findAll();
        
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        
        allUsers.push(newUser);
        fs.writeFileSync(path.resolve(__dirname,this.fileName), JSON.stringify(allUsers, null, " "));
        
    },


    //eliminar
    delete: function (id) {
        let allUsers = this.findAll();
        let usersNoDelete = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(usersNoDelete, null, " "));
        return true;
    }
}

module.exports = theUser;

const User = require("../models/User")
function userLoggedMidlewere(req, res, next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail
    let userFromCookie = User.findByParam("email", emailInCookie);


    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;   
    }
    
    next();
}

module.exports = userLoggedMidlewere;


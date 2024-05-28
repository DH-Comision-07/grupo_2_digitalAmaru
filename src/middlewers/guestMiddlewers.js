function guestmiddlewers(req, res, next){
    if (req.session.userLogged){
        return res.redirect('/user/perfil')
    }
    next();
}
module.exports = guestmiddlewers;
/* **************** MIDDLEWARE A NIVEL RUTA **************** */
function guestMiddleware (req, res, next){
    if(req.session.userLogged){/* si hay usuario en sesion, entra */
        return res.redirect("/users/profile")/* redirigimos al perfil. Sirve en casos que quiera entrar a register o login ya teniendo cuenta creada y en sesion */
    }
    next()
}

module.exports = guestMiddleware;
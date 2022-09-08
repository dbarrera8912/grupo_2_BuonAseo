/* **************** MIDDLEWARE A NIVEL RUTA **************** */
function authMiddleware (req, res, next){
    if(!req.session.userLogged){/* si no hay usuario en sesion, entra */
        return res.redirect("/users/login")/* lo manda al login. Sirve en casos que quiera acceder al carrito, o algun sitio solo para usuarios */
    }
    next()
}

module.exports = authMiddleware;
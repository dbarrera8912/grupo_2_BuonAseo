const {cargarUsers} = require("../../data/db_users/db_users");

/* **************** MIDDLEWARE A NIVEL APP **************** */
function userLoggedMiddleware(req,res,next) {
    res.locals.isLogged = false;
    
    let emailInCookie = req.cookies.userEmail;/* Sacamos el email de la cookie */
    let userFromCookie = cargarUsers().find(oneUser => oneUser["email"] === emailInCookie)/* Buscamos un email igual en la base de datos */ 

    if (userFromCookie) {/* si hay usuario en cookie, entra */
        req.session.userLogged = userFromCookie /* guardamos el usuario de la cookie en session */
    }
    
    if(req.session.userLogged){/* si hay usuario en sesion, entra */
        res.locals.isLogged = true; /* variable para adaptar el header */
        res.locals.userLogged = req.session.userLogged; /* mandamos el usuario en sesion a nivel app */
    }

    next();
}

module.exports = userLoggedMiddleware
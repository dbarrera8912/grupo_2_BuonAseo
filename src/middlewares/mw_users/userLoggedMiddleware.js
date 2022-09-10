const { cargarUsers } = require("../../data/db_users/db_users");
const admins = ["richard@gmail.com", "sirley@gmail.com", "matias@gmail.com", "daniel@gmail.com",
    "julian@gmail.com", "eric@gmail.com"]

/* **************** MIDDLEWARE A NIVEL APP **************** */
function userLoggedMiddleware(req, res, next) {
    res.locals.userLogin = false;

    let emailInCookie = req.cookies.buonaseo;/* Sacamos el email de la cookie */
    let userFromCookie = cargarUsers().find(oneUser => oneUser["email"] === emailInCookie)/* Buscamos un email igual en la base de datos */

    if (userFromCookie) {/* si hay usuario en cookie, entra */
        req.session.userLogged = userFromCookie /* guardamos el usuario de la cookie en session */
    }

    if (req.session.userLogged) {/* si hay usuario en sesion, entra */
        res.locals.userLogin = true; /* variable para adaptar el header */
        res.locals.userLogged = req.session.userLogged; /* mandamos el usuario en sesion a nivel app */

        res.locals.adminEntry = false;
        admins.forEach(admin => {/* recorremos admins */
            if (req.session.userLogged.email === admin) {/* si el email en sesion es igual al email de un admin, entra */
                res.locals.adminEntry = true;
                return next()/* se ejecuta lo pedido y continuamos. Sirve en casos donde quiera acceder a un lugar prohibido de la web, donde solo pueden entrar adminss */
            }
        });
    }

    next();
}

module.exports = userLoggedMiddleware
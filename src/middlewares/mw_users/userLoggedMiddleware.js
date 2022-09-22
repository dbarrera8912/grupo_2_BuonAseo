const { cargarUsers } = require("../../data/db_users/db_users");
const admins = ["richard@gmail.com", "sirley@gmail.com", "matias@gmail.com", "daniel@gmail.com",
    "julian@gmail.com", "eric@gmail.com"]

/* **************** MIDDLEWARE A NIVEL APP **************** */
function userLoggedMiddleware(req, res, next) {
    res.locals.userLogin = false;


    if (req.cookies.buonaseo) {/* si hay usuario en cookie, entra */
        req.session.userLogged = req.cookies.buonaseo /* guardamos el usuario de la cookie en session */
    }

    if (req.session.userLogged) {/* si hay usuario en sesion, entra */
        res.locals.userLogin = true; /* variable para adaptar el header */
        res.locals.userLogged = req.session.userLogged; /* mandamos el usuario en sesion a nivel app */

        res.locals.adminEntry = false;
        let {email} = cargarUsers().find(user => user.id === req.session.userLogged.id)
        admins.forEach(admin => {/* recorremos admins */
            if (email === admin) {/* si el email en sesion es igual al email de un admin, entra */
                res.locals.adminEntry = true;
            }
        });
    }

    next();
}

module.exports = userLoggedMiddleware
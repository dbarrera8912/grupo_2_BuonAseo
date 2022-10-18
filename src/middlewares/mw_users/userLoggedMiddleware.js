const db = require("../../database/models");
/* const admins = ["richard@gmail.com", "sirley@gmail.com", "matias@gmail.com", "daniel@gmail.com",
    "julian@gmail.com", "eric@gmail.com"] */

/* **************** MIDDLEWARE A NIVEL APP **************** */
async function userLoggedMiddleware(req, res, next) {
    try {
        res.locals.userLogin = false;


        if (req.cookies.buonaseo) {/* si hay usuario en cookie, entra */
            req.session.userLogged = req.cookies.buonaseo /* guardamos el usuario de la cookie en session */
        }

        if (req.session.userLogged) {/* si hay usuario en sesion, entra */
            res.locals.userLogin = true; /* variable para adaptar el header */
            res.locals.userLogged = req.session.userLogged; /* mandamos el usuario en sesion a nivel app */

            res.locals.adminEntry = false;
            const user = await db.User.findByPk(req.session.userLogged.id, {
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
            })
            if (user.dataValues.is_admin === 1) {/* si el email en sesion es igual al email de un admin, entra */
                res.locals.adminEntry = true;
            }
        }

        next();
    } catch (error) {
        return console.log(error)
    }
}

module.exports = userLoggedMiddleware
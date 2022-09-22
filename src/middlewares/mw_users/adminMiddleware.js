const { cargarUsers } = require("../../data/db_users/db_users");
const admins = ["richard@gmail.com", "sirley@gmail.com","matias@gmail.com","daniel@gmail.com", 
"julian@gmail.com", "eric@gmail.com"]

/* **************** MIDDLEWARE A NIVEL RUTA **************** */
function adminMiddleware (req, res, next){
    let {email} = cargarUsers().find(user => user.id === req.session.userLogged.id)
    admins.forEach(admin => {/* recorremos admins */
        if(email === admin){/* si el email en sesion es igual al email de un admin, entra */
            return next()/* se ejecuta lo pedido y continuamos. Sirve en casos donde quiera acceder a un lugar prohibido de la web, donde solo pueden entrar adminss */
        }
    });
    return res.redirect("/notAdmin")/* si no coincide ningun email, retorna esto */
}

module.exports = adminMiddleware;
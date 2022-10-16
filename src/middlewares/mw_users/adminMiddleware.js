const db = require("../../database/models");
const admins = ["richard@gmail.com", "sirley@gmail.com","matias@gmail.com","daniel@gmail.com", 
"julian@gmail.com", "eric@gmail.com"]

/* **************** MIDDLEWARE A NIVEL RUTA **************** */
async function adminMiddleware (req, res, next){
    try {
        const user = await db.User.findByPk(req.session.userLogged.id, {
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
        })
        const email = user.dataValues.email
        
        admins.forEach(admin => {/* recorremos admins */
            if(email === admin){/* si el email en sesion es igual al email de un admin, entra */
                return next()/* se ejecuta lo pedido y continuamos. Sirve en casos donde quiera acceder a un lugar prohibido de la web, donde solo pueden entrar adminss */
            }
        });
        return res.redirect("/notAdmin")/* si no coincide ningun email, retorna esto */
    } catch (error) {
        return console.log(error)
    }
}

module.exports = adminMiddleware;
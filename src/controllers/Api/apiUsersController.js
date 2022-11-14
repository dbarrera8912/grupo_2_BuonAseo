const db = require("../../database/models");
const moment = require("moment");
const { literal } = require('sequelize');
const path = require('path');

module.exports = {
    all: async (req, res) => {
        /* devuelve todos los usuarios */
        try {
            let { limit = 4, page = 1, order = 'ASC', sortBy = 'id', search = "", sale = 0 } = req.query;

            /* paginación */
            limit = limit > 16 ? 16 : +limit; //no puede tener mas de 16 limit
            page = +page;
            let offset = +limit * (+page - 1); //desde de donde arranca offset. 4*0 = 0, 4*1 = 4, 4*2 = 8, y asi

            /* ordenamiento */
			order = ['ASC','DESC'].includes(order.toUpperCase()) ? order : 'ASC'; /* preguntamos si lo que viene en order es igual a la forma que tenemos para ordenar, si lo es se ordena con eso, sino con ascendente */
			sortBy =  ['name', 'email', 'dni', 'birthday'].includes(sortBy.toLowerCase()) ? sortBy : 'id'; /* preguntamos si lo que viene en sortBy es igual a las columnas que tenemos para ordenar, si lo es se ordena esa columna, sino con el id */

			let orderQuery = sortBy === "category" ? ['category','name',order] : [sortBy, order]


            let { count, rows: users } = await db.User.findAndCountAll({
                distinct: true, // no cuenta resultados anidados, como los intereses.
                limit,
                offset,
                order : [orderQuery],
                attributes: {
                    exclude: ['password', 'id_type_user', "is_admin", "id_gender", 'createdAt', 'updatedAt', 'deletedAt'],
                    include: [
                        [literal(`CONCAT('${req.protocol}://${req.get('host')}/api/users/avatar/',avatar)`), 'avatarURL'],
                        [literal(`CASE WHEN is_admin = 1 THEN 'admin' ELSE 'usuario' END`), 'tipoUsuario'] /* if, si es 1, tipo usuario se carga con admin, sino, con usuario */
                    ]
                },
                include: [
                    {
                        association: "interest",
                        include: [
                            {
                                association: "interest",
                                attributes: {
                                    exclude: ["id", "createdAt", "updatedAt", "deletedAt"],
                                }
                            }
                        ],
                        attributes: {
                            exclude: ["id", "id_user", "createdAt", "updatedAt", "deletedAt"],
                        },
                    },
                    {
                        association: "gender",
                        attributes: {
                            exclude: ["id", "createdAt", "updatedAt", "deletedAt"],
                        },
                    }
                ]
            })

            const queryKeys = {/* objeto con todas las queries que hay */
                limit,
                order,
				sortBy,
            }

            let queryUrl = "";
            for (const key in queryKeys) {/* recorremos el objeto de queries y lo cargamos a queryUrl con su clave y valor. */
                queryUrl += `&${key}=${queryKeys[key]}`
            }

            const existPrev = page > 1; 
            const existNext = offset + limit < count; /* muestra siguien pagina si offset + limit es menor a count, entra si 5+5 es menor a 16, y asi. */

            const prev = existPrev ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page - 1}${queryUrl}` : null;
            const next = existNext ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page + 1}${queryUrl}` : null;

            return res.status(200).json({
                ok: true,
                status: 200,
                meta: {
                    total: count,
                    quantity: users.length,
                    page,
                    prev,
                    next
                },
                data: users
            })

        } catch (error) {

            if (!error.errors) {
                return res.status(error.status || 500).json({
                    ok: false,
                    error: error.message || "Upss, error! Comuníquese con el administrador",
                })
            }

            let errorsObject = {}

            error.errors.forEach(error => {
                errorsObject = {
                    ...errorsObject,
                    [error.path]: error.message
                }
            });

            return res.status(error.status || 500).json({
                ok: false,
                error: errorsObject,
            });
        }
    },
    getOne: async (req, res) => {
        /* devuelve solo un usuario */
        try {
            const { id } = req.params;

            let user = await db.User.findByPk(id, {
                attributes: {
                    exclude: ['password', 'id_type_user', "is_admin", "id_gender", 'createdAt', 'updatedAt', 'deletedAt'],
                    include: [
                        [literal(`CONCAT('${req.protocol}://${req.get('host')}/api/users/avatar/',avatar)`), 'avatarURL'],
                        [literal(`CASE WHEN is_admin = 1 THEN 'admin' ELSE 'usuario' END`), 'tipoUsuario']
                    ]
                },
                include: [
                    {
                        association: "interest",
                        include: [
                            {
                                association: "interest",
                                attributes: {
                                    exclude: ["id", "createdAt", "updatedAt", "deletedAt"],
                                }
                            }
                        ],
                        attributes: {
                            exclude: ["id", "id_user", "createdAt", "updatedAt", "deletedAt"],
                        },
                    },
                    {
                        association: "gender",
                        attributes: {
                            exclude: ["id", "createdAt", "updatedAt", "deletedAt"],
                        },
                    }
                ]
            })

            return res.status(200).json({
                ok: true,
                status: 200,
                data: user
            })

        } catch (error) {

            if (!error.errors) {
                return res.status(error.status || 500).json({
                    ok: false,
                    error: error.message || "Upss, error! Comuníquese con el administrador",
                })
            }

            let errorsObject = {}

            error.errors.forEach(error => {
                errorsObject = {
                    ...errorsObject,
                    [error.path]: error.message
                }
            });

            return res.status(error.status || 500).json({
                ok: false,
                error: errorsObject,
            });
        }
    },
    getAvatar: async (req, res) => {
        /* devuelve la imagen de perfil del usuario */
        return res.sendFile(path.join(__dirname, '..', '..', '..', 'public', 'img', 'fotos-users', req.params.avatar))
    }
}
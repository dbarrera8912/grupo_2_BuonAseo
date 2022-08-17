const { preguntasFrecuentes, preguntasEscribir, metodosDePago, metodosEscribir,
    preguntasActualizarId, preguntasFechaDeCreacion } = require("../data/db_footer/db_FooterModule")

module.exports = {
    nosotros: (req, res) => {
        return res.render('./footer-all/nosotros-QuienesSomos')
    },

    politicas: (req, res) => {
        return res.render('./footer-all/informacion/politicas-privacidad')
    },

    puntos: (req, res) => {
        return res.render('./footer-all/informacion/puntos-entrega')
    },

    terminos: (req, res) => {
        return res.render('./footer-all/informacion/terminos-condiciones')
    },

    boton: (req, res) => {
        return res.render('./footer-all/defensaDelConsumidor/botonDeArrepentimiento')
    },

    reclamos: (req, res) => {
        return res.render('./footer-all/defensaDelConsumidor/reclamosIngresarAqui')
    },

    comprar: (req, res) => {
        return res.render('./footer-all/ayuda/comoComprar')
    },

    /* METODOS DE PAGO */
    pagos: (req, res) => {/* METODO GET DE METODOS DE PAGO */
        metodos = metodosDePago(); /* leemos los metodos de pago */
        return res.render('./footer-all/ayuda/metodosDePago', {/* Renderizamos y mandamos metodos de pago */
            metodos
        })
    },
    agregarPagos: (req, res) => {/* METODO GET DE AGREGAR PAGO */
        metodos = metodosDePago(); /* leemos los metodos de pago */
        return res.render('./footer-all/ayuda/metodosAgregar')/* renderizamos */
    },
    escribirPagos: (req, res) => {/* METODO POST DE AGREGAR PAGO */
        if (req.files) {/* si cargo las imagenes entra. */
            metodos = metodosDePago(); /* leemos los metodos de pago */
            const { icono, title, letraAbajoS, letraAbajoI, letraAbajoT } = req.body;/* Destructuring de la nueva pregunta del usuario */
            const imagenes = []
            for (let x = 0; x < req.files.length; x++) {/* recorremos todas las imagenes */
                imagenes.push(req.files[x].filename)/* pusheamos el nombre de la imagen al array. */
            }
            const id = metodos[metodos.length - 1].id; /* Sacamos el ultimo id */
            const newMetodo = {
                id: id + 1,
                icono,
                titulo: title.trim(),/* con trim sacamos espacios al inicio y final */
                letraAbajoTitulo: letraAbajoS.trim(),
                img: imagenes,
                letraFullAbajo: letraAbajoI.trim(),
                letraAbajoDeImagen: letraAbajoT.split("\r\n"),/* Dividimos la respuesta en elementos dentro de un array */
                fecha: preguntasFechaDeCreacion()
            }
            const metodosNew = [...metodos, newMetodo]; /* Creamos nueva pregunta y la agregamos junto con las demass */
            metodosEscribir(metodosNew); /* Escribimos las preguntas en el JSON */

            return res.redirect("/footer/pagos");/* Redirigimos a las preguntas */
        } else {/* Si no cargo las imagenes lo manda aca */
            return res.render("./footer-all/ayuda/metodosAgregar")
        }

    },
    editarPagos: (req, res) => {/* METODO GET DE EDITAR PAGO*/
        metodos = metodosDePago(); /* leemos los metodos de pago */
        const metodo = metodos.find(metodo => metodo.id === +req.params.id); /* Buscamos un id de metodo igual al id pasado por parametro */
        return res.render("./footer-all/ayuda/metodosEditar", {
            metodo
        })
    },
    modificarPagos: (req, res) => {/* METODO PUT DE EDITAR PREGUNTA*/
        if (req.files) {
            metodos = metodosDePago(); /* leemos los metodos de pago */
            const { id } = req.params; /* Sacamos el id del parametro */
            const { icono, title, letraAbajoS, letraAbajoI, letraAbajoT } = req.body;/* Destructuring de la nueva pregunta del usuario */
            const imagenes = []
            for (let x = 0; x < req.files.length; x++) {
                imagenes.push(req.files[x].filename)
            }
            const pagosModificados = metodos.map(metodo => { /* recorremos el array para modificarlo */
                if (metodo.id === +id) {
                    return {
                        ...metodo, /* ingresamos todos los datos del metodo con spread */
                        icono,
                        titulo: title.trim(), /* Con trim sacamos espacios antes y final */
                        letraAbajoTitulo: letraAbajoS.trim(),
                        img: imagenes,
                        letraFullAbajo: letraAbajoI.trim(),
                        letraAbajoDeImagen: letraAbajoT.split("\r\n"),
                        fecha: preguntasFechaDeCreacion()
                    }
                }
                return metodo
            })
            metodosEscribir(pagosModificados); /* Escribimos los nuevos metodos en el JSON */
            return res.redirect("/footer/pagos")
        } else {
            return res.redirect("/footer/pagos/editar/" + req.params.id)
        }
    },
    eliminarPagos: (req, res) => {/* METODO DELETE DE PREGUNTAS*/
        metodos = metodosDePago(); /* leemos los metodos de pago */

        const metodosModificados = metodos.filter(metodo => metodo.id !== +req.params.id); /* Eliminamos la pregunta, dejando el id de producto igual al id pasado por parametro por fuera */
        preguntasActualizarId(metodosModificados)
        metodosEscribir(metodosModificados);/* Escribimos las preguntas en el json */

        return res.redirect("/footer/pagos");/* Redirigimos a las preguntas */
    },

    /* PREGUNTAS */
    preguntas: (req, res) => { /* METODO DE GET DE PREGUNTAS */
        preguntas = preguntasFrecuentes();/* leemos las preguntas */
        return res.render('./footer-all/ayuda/preguntasFrecuentes', {/* Renderizamos y mandamos preguntas */
            preguntas
        })
    },
    searchPregunta: (req, res) => {/* METODO GET DE BUSCAR PREGUNTA, vista preguntas y preguntas/search*/
        preguntas = preguntasFrecuentes();/* leemos las preguntas */
        let resultado = [];
        let resto = [];
        for (let x = 0; x < preguntas.length; x++) { preguntas[x].title.toLowerCase().includes(req.query.keywords.toLowerCase()) ? resultado.push(preguntas[x]) : resto.push(preguntas[x]); /* If ternario, si el valor buscado es true pushea en resultado, si es falso pushea en resto */ }

        return res.render('./footer-all/ayuda/preguntaEncontrada', { resultado, keywords: req.query.keywords, resto, })/* Renderizamos vista, mandamos el resultado, y si no encuentra, mostramos su busqueda no fue encontrado con su pedido keywords. Tambien mostramos las preguntas ajenas a su busqueda */
    },
    agregarPregunta: (req, res) => {/* METODO GET DE AGREGAR PREGUNTA*/
        preguntas = preguntasFrecuentes();/* leemos las preguntas */
        return res.render('./footer-all/ayuda/preguntasAgregar')/* renderizamos */
    },
    escribirPregunta: (req, res) => {/* METODO POST DE AGREGAR PREGUNTA*/
        preguntas = preguntasFrecuentes();/* leemos las preguntas */
        const { title, response, link, frase } = req.body;/* Destructuring de la nueva pregunta del usuario */
        const id = preguntas[preguntas.length - 1].id; /* Sacamos el ultimo id */
        const newPregunta = {
            id: id + 1,
            title: title.trim(),/* con trim sacamos espacios al inicio y final */
            response: response.split("\r\n"),/* Dividimos la respuesta en elementos dentro de un array */
            href: link,
            a: frase,
            fecha: preguntasFechaDeCreacion()
        }
        const preguntasNew = [...preguntas, newPregunta]; /* Creamos nueva pregunta y la agregamos junto con las demass */

        preguntasEscribir(preguntasNew); /* Escribimos las preguntas en el JSON */

        return res.redirect("/footer/preguntas");/* Redirigimos a las preguntas */
    },
    editarPregunta: (req, res) => {/* METODO GET DE EDITAR PREGUNTA*/
        preguntas = preguntasFrecuentes();/* leemos las preguntas */
        const pregunta = preguntas.find(pregunta => pregunta.id === +req.params.id); /* Buscamos un id de pregunta igual al id pasado por parametro */
        return res.render("./footer-all/ayuda/preguntasEditar", {
            pregunta
        })
    },
    modificarPregunta: (req, res) => {/* METODO PUT DE EDITAR PREGUNTA*/
        preguntas = preguntasFrecuentes();/* leemos las preguntas */
        const { id } = req.params; /* Sacamos el id del parametro */
        const { title, response, link, frase } = req.body;/* Destructuring de la nueva edicion de pregunta del usuario */
        const preguntasModificas = preguntas.map(pregunta => { /* recorremos el array para modificarlo */
            if (pregunta.id === +id) {
                return {
                    ...pregunta, /* ingresamos todos los datos de la pregunta con spread */
                    title: title.trim(), /* Con trim sacamos espacios antes y final */
                    response: response.split("\r\n"),/* Dividimos la respuesta en elementos dentro de un array */
                    href: link,
                    a: frase,
                    fecha: preguntasFechaDeCreacion()
                }
            }
            return pregunta
        })
        preguntasEscribir(preguntasModificas);/* Escribimos las preguntas en el json */
        return res.redirect("/footer/preguntas/editar/" + req.params.id)
    },
    eliminarPregunta: (req, res) => {/* METODO DELETE DE PREGUNTAS*/
        preguntas = preguntasFrecuentes();/* leemos las preguntas */

        const preguntasModificadas = preguntas.filter(pregunta => pregunta.id !== +req.params.id); /* Eliminamos la pregunta, dejando el id de producto igual al id pasado por parametro por fuera */
        preguntasActualizarId(preguntasModificadas)
        preguntasEscribir(preguntasModificadas);/* Escribimos las preguntas en el json */

        return res.redirect("/footer/preguntas");/* Redirigimos a las preguntas */
    },
}    
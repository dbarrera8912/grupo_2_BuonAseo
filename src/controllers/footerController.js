const { preguntasFrecuentes, preguntasEscribir } = require("../data/db_module")

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

    pagos: (req, res) => {
        return res.render('./footer-all/ayuda/metodosDePago')
    },

    preguntas: (req, res) => {
        preguntas = preguntasFrecuentes();/* leemos las preguntas */
        return res.render('./footer-all/ayuda/preguntasFrecuentes', {/* Renderizamos y mandamos preguntas y respuestas */
            preguntas,
            respuestas: preguntas.response
        })
    },
    searchPregunta: (req, res) => {
        preguntas = preguntasFrecuentes();/* leemos las preguntas */
        let resultado = [];
        let resto = [];
        for (let x = 0; x < preguntas.length; x++) { preguntas[x].title.toLowerCase().includes(req.query.keywords.toLowerCase()) ? resultado.push(preguntas[x]) : resto.push(preguntas[x]); /* If ternario, si el valor buscado es true pushea en resultado, si es falso pushea en resto */ }

        return res.render('./footer-all/ayuda/preguntaEncontrada', { resultado, keywords: req.query.keywords, resto, })/* Renderizamos vista, mandamos el resultado, y si no encuentra, mostramos su busqueda no fue encontrado con su pedido keywords. Tambien mostramos las preguntas ajenas a su busqueda */
    },
    agregarPregunta: (req, res) => {/* METODO GET DE AGREGAR*/
        preguntas = preguntasFrecuentes();/* leemos las preguntas */
        return res.render('./footer-all/ayuda/preguntasAgregar')/* renderizamos */
    },
    escribirPregunta: (req, res) => {/* METODO POST DE AGREGAR */
        preguntas = preguntasFrecuentes();/* leemos las preguntas */
        const { title, response, link, frase } = req.body;/* Destructuring de la nueva pregunta del usuario */
        const id = preguntas[preguntas.length - 1].id; /* Sacamos el ultimo id */

        const newPregunta = {
            id: id + 1,
            title: title.trim(),/* con trim sacamos espacios al inicio y final */
            response: [response],
            href: link,
            a: frase
        }
        const preguntasNew = [...preguntas, newPregunta]; /* Creamos nueva pregunta y la agregamos junto con las demass */

        preguntasEscribir(preguntasNew); /* Escribimos las preguntas en el JSON */

        return res.redirect("/");/* Redirigimos al home */
    },
    editarPregunta: (req, res) => {/* METODO GET DE AGREGAR*/
        preguntas = preguntasFrecuentes();/* leemos las preguntas */
        const pregunta = preguntas.find(pregunta => pregunta.id === +req.params.id); /* Buscamos un id de pregunta igual al id pasado por parametro */
        return res.render("./footer-all/ayuda/preguntasEditar", {
            pregunta
        })
    },
}    
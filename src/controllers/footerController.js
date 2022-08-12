const preguntas =require ("../data/db_module").preguntasFrecuentes()

module.exports={
    nosotros : (req,res) => {
        return res.render('./footer-all/nosotros-QuienesSomos')
    },

    politicas : (req,res) => {
        return res.render('./footer-all/informacion/politicas-privacidad')
    },
    
    puntos : (req,res) => {
        return res.render('./footer-all/informacion/puntos-entrega')
    },

    terminos : (req,res) => {
        return res.render('./footer-all/informacion/terminos-condiciones')
    },

    boton : (req,res) => {
        return res.render('./footer-all/defensaDelConsumidor/botonDeArrepentimiento')
    },

    reclamos : (req,res) => {
        return res.render('./footer-all/defensaDelConsumidor/reclamosIngresarAqui')
    },

    comprar : (req,res) => {
        return res.render('./footer-all/ayuda/comoComprar')
    },

    pagos : (req,res) => {
        return res.render('./footer-all/ayuda/metodosDePago')
    },

    preguntas : (req,res) => {
        return res.render('./footer-all/ayuda/preguntasFrecuentes',{
            preguntas,
            respuestas : preguntas.response
        })
    },
    searchPregunta : (req,res) => {
        let buscado = req.query.keywords;
        
        let resultado = [];
        for (let x = 0; x < preguntas.length; x++) {
            if (preguntas[x].title.toLowerCase().includes(buscado.toLowerCase())) {
                resultado.push(preguntas[x]);
            }    
        }
        
        /* Renderizamos vista, mandamos el resultado, y si no encuentra, mostramos su busqueda no fue encontrado con su pedido keywords */
        return res.render('./footer-all/ayuda/preguntaEncontrada', {
            resultado,
            keywords : req.query.keywords,
            preguntas,
        })
    }

    
}    
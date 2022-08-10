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
        return res.render('./footer-all/defensaDelconsumidor/botonDeArrepentimiento')
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
        return res.render('./footer-all/ayuda/preguntasFrecuentes')
    }

    
}
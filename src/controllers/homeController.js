module.exports={
    home : (req,res) => {
        return res.render('./home/home')
    },

    ofertas : (req,res) => {
        return res.render('./home/oferta')
    },
    
    destacados : (req,res) => {
        return res.render('./home/productosDestacados')
    }
}
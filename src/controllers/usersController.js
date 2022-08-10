module.exports={
    login : (req,res) => {
        return res.render('./users/login')
    },

    formulario : (req,res) => {
        return res.render('./users/formulario')
    },
    
    password : (req,res) => {
        return res.render('./users/password-lost')
    }
}
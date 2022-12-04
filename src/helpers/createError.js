module.exports = (status, message) => {
    let error = new Error(message); // inicializamos la variable error aniadiendole un nuevo error y le pasamos un mensaje por parametro
    error.status = status; // a la propiedad error.status le aniadimos el status que viene por parametro

    return error //retornamos el error
<<<<<<< HEAD
}
=======
}
>>>>>>> home

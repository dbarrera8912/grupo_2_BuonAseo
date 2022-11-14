module.exports = (error) => { // traemos el error como parametro
    if(!error.errors){ // preguntamos si error.errors es false
        return error.message || "Upss, error! Comuníquese con el administrador" 
        // retornamos el la propiedad error.message o un mensaje por defecto
    }

    let errorsObject = {} // inicializamos la variable errorsObject y le asignamos un objeto vacio
    
    error.errors.forEach(error => { // recorremos la propiedad errors de error 
        errorsObject = { // traemos errorsObject
            ...errorsObject, // traemos todo de errorsObject con spread operator
            [error.path] : error.message // pasamos la clave error.path como array y le asignamos la propiedad error.message
        }
    });

    return errorsObject; // retornamos errorsObject
}
const fs = require('fs');

module.exports = (errors, req) => {
    let errorMessages = {}; //cree la variable errorMessages y le asigno un objeto vacio 
    let errorsObject = errors.mapped(); // cree la variable errorsObjetc y le asigno los errores mapeados

    if(req.files){ // pregunto si req.file es true
        req.files.forEach(file => { // recorremos req.file para borrar si existe la imagen
            fs.unlinkSync('public/images/products/' + file.filename)
        })
    } 

    if(req.fileValidationError){  // pregunto si req.fileValidationError es true
        errorsObject = {  // traigo la variable errorsObject
            ...errorsObject, // traigo todo de errorsObject con spread operator
            images : { // creo la clave images
                msg : req.fileValidationError // le paso a la propiedad msg el valor que venga por req.fileValidationError
            } 
        }
    }

    for (const key in errorsObject) { // creo la constante key y recorremos el objeto errorObject
        console.log(key, [key])
        errorMessages = { // por cada vuelta recorre  el objeto errorMessages
            ...errorMessages, // traigo todo de errorMessages con spread operator
            [key] : errorsObject[key].msg // 
        }
    }

    let error = new Error() // creo la variable error le asigno un nuevo error
    error.status = 400; // a la propiedad error.status le asigno 400
    error.message = errorMessages // a la propiedad error.message le asigno el objeto errorMessages
    
    return error // retorno el error

}
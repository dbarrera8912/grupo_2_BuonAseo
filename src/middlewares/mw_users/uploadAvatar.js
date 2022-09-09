const multer = require("multer");
const path = require("path");

const storageAvatar = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/img/fotos-users");
    },
    filename: (req, file, cb) => {
        cb(null, `avatar-${Date.now()}${path.extname(file.originalname)}`);
    }
})

const fileFilter = (req, file, cb) =>{ //Funcion para filtrar tipo de archivos respecto a su extension
    if (!file.originalname.toLowerCase().match(/\.(jpeg|jpg|png|gif|webp)$/)) {
        req.fileValidationError = "Solo se permite imagenes jpg, jpeg, png, gif, webp";
        return cb(null, false, req.fileValidationError)
    }
    return cb(null, true)
}

const uploadAvatar = multer({
    storage: storageAvatar,
    limits: {fileSize: 3000000}, /* 1 millon es 1MB, limita el peso del archivo */
    fileFilter
})

module.exports = {
    uploadAvatar
}
const fs = require('fs');
const path = require('path');

const loadProducts = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'productos.json'), 'utf-8'));
};
const insertProduct = (products) =>{
    fs.writeFileSync(path.join(__dirname, "productos.json"), JSON.stringify(products, null, 3), "utf-8")
}

const eliminarImg = (ruta) =>{
    fs.existsSync(path.resolve(__dirname, "../../../public" + ruta)) && fs.unlinkSync(path.resolve(__dirname, "../../../public" + ruta))
}

module.exports = {
    loadProducts,
    insertProduct,
    eliminarImg
}
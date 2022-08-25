const fs = require('fs');
const path = require('path');

const loadProducts = () => {
    return JSON.parse(
        fs.readFileSync(path.join(__dirname, './db_productos/productos.json'), 'utf-8')
    );
};
const insertProduct = (products) =>{

    var jsonContent = JSON.stringify(products);
    console.log(jsonContent);
    let path = __dirname+"/db_productos/productos.json";
    fs.writeFile(path, jsonContent,{encoding:"utf8"}, function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    });
    return true;
}

module.exports = {
    loadProducts,
    insertProduct
}
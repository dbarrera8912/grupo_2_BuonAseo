/* requerimos fs y path */
const fs = require('fs');
const path = require('path');

module.exports={
    preguntasFrecuentes: () => {
        return JSON.parse(fs.readFileSync(path.join(__dirname, 'preguntas.json'),'utf-8'))/* Leemos el json y lo convertimos a objeto literal */
    }
}
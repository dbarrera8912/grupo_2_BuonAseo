/* requerimos fs y path */
const fs = require('fs');
const path = require('path');

module.exports={
    preguntasFrecuentes: () => {
        return JSON.parse(fs.readFileSync(path.join(__dirname, 'preguntas.json'),'utf-8'))/* Leemos el json y lo convertimos a objeto literal */
    },
    preguntasEscribir: (preguntas) =>{
        fs.writeFileSync(path.join(__dirname, "preguntas.json"), JSON.stringify(preguntas, null, 3), "utf-8")/* Convertimos el objeto a JSON y lo escribimos en preguntas.json */
    }
}
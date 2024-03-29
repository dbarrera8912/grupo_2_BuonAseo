/* requerimos fs y path */
const fs = require('fs');
const path = require('path');
const fecha = new Date();

module.exports={
    preguntasFrecuentes: () => {
        return JSON.parse(fs.readFileSync(path.join(__dirname, 'preguntas.json'),'utf-8'))/* Leemos el json y lo convertimos a objeto literal */
    },
    preguntasEscribir: (preguntas) =>{
        fs.writeFileSync(path.join(__dirname, "preguntas.json"), JSON.stringify(preguntas, null, 3), "utf-8")/* Convertimos el objeto a JSON y lo escribimos en preguntas.json */
    },
    metodosDePago: () => {
        return JSON.parse(fs.readFileSync(path.join(__dirname, 'metodosDePago.json'),'utf-8'))/* Leemos el json y lo convertimos a objeto literal */
    },
    metodosEscribir: (metodos) =>{
        fs.writeFileSync(path.join(__dirname, "metodosDePago.json"), JSON.stringify(metodos, null, 3), "utf-8")/* Convertimos el objeto a JSON y lo escribimos en metodosDePago.json */
    },
    preguntasActualizarId: (preguntas)=>{ //modifica las id empezando desde 1, y las siguienes ++.
        for(x = 0; x < preguntas.length; x++){
                x === 0? preguntas[x].id = 1 : preguntas[x].id = x + 1;}
    },
    preguntasFechaDeCreacion: () => {
        return fecha.toLocaleString();//asigna la fecha y hora del momento.
        //`${fecha.getDate()}/${fecha.getMonth() +1}/${fecha.getFullYear()} [${fecha.getHours()}:${fecha.getMinutes()}]`
    }
}
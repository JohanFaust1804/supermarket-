const mysql2 = require('mysql2');
const config = require('../config');

const prueba = {
    id : 1,
    nombre: 'Juan',
    apellido: 'Perez',
    edad: 30
}

function todos (tabla){
    return prueba;
}

function uno (tabla, id){
    if(tabla === tabla){
        console.log('tabla igual');
    }
}

function agregar(tabla, data) {

}

function eliminar (tabla, id){

}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar
}
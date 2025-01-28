const db = require('../../DB/mysql2');

const TABLA = 'clientes';

function todos ()  {
    return db.todos(TABLA)
}

function uno (id)  {
    return db.uno(TABLA, id)
}

function eliminar(body)  {
    return db.eliminar(TABLA, body)
}

function agregarCliente(body)  {
    return db.agregar(TABLA, body)
}

module.exports = {
    todos,
    uno,
    eliminar,
    agregarCliente 
}


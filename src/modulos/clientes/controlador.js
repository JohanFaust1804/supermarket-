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

module.exports = {
    todos,
    uno,
    eliminar
}


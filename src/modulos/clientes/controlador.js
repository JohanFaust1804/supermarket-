const db = require('../../DB/mysql2');

const TABLA = 'clientes';

function todos ()  {
    return db.todos(TABLA)
}

module.exports = {
    todos,
}
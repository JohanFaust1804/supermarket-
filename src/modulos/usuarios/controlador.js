const TABLA = 'usuarios';
module.exports = function (dInyectada){
    
    let db = dInyectada;

    if (!db) {
        db = require('../../DB/mysql2');
    }

    function todos() {
        return db.todos(TABLA);
    }
    
    function uno(id) {
        return db.uno(TABLA, id);
    }
    
    function eliminar(body) {
        return db.eliminar(TABLA, body);
    }
    
    function agregarCliente(body) {
        return db.agregar(TABLA, body);
    }

    return{
        todos,
        uno,
        eliminar,
        agregarCliente    
    }    
}

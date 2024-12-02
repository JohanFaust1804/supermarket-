const mysql2 = require('mysql2');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

let conexion;

function conMysql() {
    conexion = mysql2.createConnection(dbconfig);

    conexion.connect((err) => {
        if (err){
            console.log(['db err'], err);
            setTimeout(conMysql, 200);
        } else {
            console.log('db conectada!!!');
        }
    });

    conexion.on('error', err => {
        console.log(['db err'], err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        } else{
            throw err; 
        }
    })
}

conMysql(); // Inicia la conexión a la base de datos

function todos(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT * FROM ??', [tabla], (error, result) => { // Usando placeholders para evitar inyección SQL
            if (error) {
                console.error('Error en la consulta:', error); // Muestra el error en consola para debug
                return reject(error);
            }
            console.log('Registros obtenidos:', result); // Asegúrate de que los resultados son correctos
            resolve(result); // Devuelve los resultados
        });
    });
}


function uno (tabla, id) {
    if(tabla === tabla) {
        console.log('tabla igual');
    }
}

function agregar(tabla, data) {
    // Implementar lógica de agregar
}

function eliminar(tabla, id) {
    // Implementar lógica de eliminar
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar
};

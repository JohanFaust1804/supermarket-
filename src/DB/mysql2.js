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
        console.error('Error en la consulta:', error); // Muestra el error en consola para debug
        return error ? reject (error) :resolve (result);
            
        console.log('Registros obtenidos:', result); // Asegúrate de que los resultados son correctos
        resolve(result); // Devuelve los resultados
        });
    });
}


function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT * FROM ?? where id= ?', [tabla, id], (error, result) => { // Usando placeholders para evitar inyección SQL
        console.error('Error en la consulta:', error); // Muestra el error en consola para debug
        return error ? reject (error) :resolve (result);
            
        console.log('Registros obtenidos:', result); // Asegúrate de que los resultados son correctos
        resolve(result); // Devuelve los resultados
        });
    });

    
}

function agregar(tabla, data) {
    // Implementar lógica de agregar
}

function eliminar(tabla, data) {
    // Verificar si el nombre de la tabla es una cadena válida
    if (typeof tabla !== 'string' || tabla.trim() === '') {
        throw new Error("El nombre de la tabla no es válido");
    }

    // Verificar si el id está presente en el objeto data
    if (!data || !data.id) {
        throw new Error("ID no proporcionado");
    }

    return new Promise((resolve, reject) => {
        conexion.query('DELETE FROM ?? where id = ?', [tabla, data.id], (error, result) => {
            if (error) {
                console.error('Error en la consulta:', error);
                return reject(error);
            }
            
            console.log('Registro eliminado:', result);
            resolve(result);
        });
    });
}


module.exports = {
    todos,
    uno,
    agregar,
    eliminar
};

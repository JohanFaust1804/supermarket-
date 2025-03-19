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
        if (err) {
            console.log(['db err'], err);
            setTimeout(conMysql, 200);
        } else {
            console.log('db conectada!!!');
        }
    });

    conexion.on('error', err => {
        console.log(['db err'], err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conMysql();
        } else {
            throw err;
        }
    });
}

conMysql();

function todos(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT * FROM ??', [tabla], (error, result) => {
            console.error('Error en la consulta:', error);
            return error ? reject(error) : resolve(result);
        });
    });
}

function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT * FROM ?? WHERE id = ?', [tabla, id], (error, result) => {
            console.error('Error en la consulta:', error);
            return error ? reject(error) : resolve(result);
        });
    });
}

function agregar(tabla, data) {
    console.log('Datos recibidos para agregar/actualizar:', data);

    const usuarioData = {
        id: data.id,
        nombre: data.nombre,
        usuario: data.usuario,
        activo: data.activo
    };

    if (data && data.id == 0) {
        return insertar(tabla, usuarioData);
    } else {
        return actualizar(tabla, usuarioData);
    }
}

function insertar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function actualizar(tabla, data) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE ${tabla} SET ? WHERE id = ?`;
        conexion.query(sql, [data, data.id], (error, result) => {
            if (error) {
                console.error('Error en la consulta SQL:', error);
                return reject(error);
            }
            resolve(result);
        });
    });
}

function eliminar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id = ?`, data.id, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar
};

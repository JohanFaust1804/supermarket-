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
    })
}

conMysql(); // Inicia la conexión a la base de datos

function todos(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT * FROM ??', [tabla], (error, result) => {
            console.error('Error en la consulta:', error); // Muestra el error en consola para debug
            return error ? reject(error) : resolve(result);

            console.log('Registros obtenidos:', result); // Asegúrate de que los resultados son correctos
            resolve(result); // Devuelve los resultados
        });
    });
}

function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT * FROM ?? where id= ?', [tabla, id], (error, result) => {
            console.error('Error en la consulta:', error); // Muestra el error en consola para debug
            return error ? reject(error) : resolve(result);

            console.log('Registros obtenidos:', result); // Asegúrate de que los resultados son correctos
            resolve(result); // Devuelve los resultados
        });
    });
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
        const sql = `UPDATE ${tabla} SET ? WHERE id=?`;
        conexion.query(sql, [data, data.id], (error, result) => {
            if (error) {
                console.error('Error en la consulta SQL:', error);
                return reject(error);
            }
            resolve(result);
        });
    });
}

function agregar(tabla, data) {
    console.log('Datos recibidos para agregar/actualizar:', data);  // Revisa lo que recibes

    // Filtra y prepara los datos
    const usuarioData = {
        id: data.id,
        nombre: data.nombre,
        usuario: data.usuario,
        activo: data.activo
    }

    const clienteData = {
        id: data.id,
        nombre: data.nombre,
        edad: data.edad,
        profesion: data.profesion
    };

    // Revisa los datos filtrados antes de pasarlos a la base de datos
    console.log('Datos filtrados para la consulta SQL:', usuarioData);

    if (data && data.id == 0) {
        return insertar(tabla, usuarioData);  // Pasa los datos filtrados
    } else {
        return actualizar(tabla, usuarioData);  // Pasa los datos filtrados
    }

    console.log('Datos filtrados para la consulta SQL:', usuarioData);

    if (data && data.id == 0) {
        return insertar(tabla, clienteData);  // Pasa los datos filtrados
    } else {
        return actualizar(tabla, clienteData);  // Pasa los datos filtrados
    }


}

function eliminar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id=?`, data.id, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar
}

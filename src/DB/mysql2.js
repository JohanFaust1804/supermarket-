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

function insertar(tabla, data) {
    return new Promise( (resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) =>{
        return error ? reject (error) : resolve (result);    
        
    });
});
}

function actualizar(tabla, data) {
    return new Promise( (resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE id=?`, [data, data.id], (error, result)  =>{
        return error ? reject (error) : resolve (result);    
        
    });
});
}

function agregar(tabla, data) {
    
    console.log('Datos recibidos para agregar/actualizar:', data);  // Revisa lo que recibes

    const clienteData = {
        id: data.id,
        nombre: data.nombre,
        edad: data.edad,
        profesion: data.profesion
    };

    // Revisa los datos filtrados antes de pasarlos a la base de datos
    console.log('Datos filtrados para la consulta SQL:', clienteData);
    
    if(data && data.id == 0) {
        return insertar(tabla, data);
    } else {
        return actualizar(tabla, data);
    }
}

function eliminar(tabla, data) {
    return new Promise( (resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id=?`, data.id, (error, result) =>{
        return error ? reject (error) : resolve (result);    
        
    });
});
}



module.exports = {
    todos,
    uno,
    agregar,
    eliminar
}

const express = require('express');

const respuesta = require('../../red/respuestas.js');
const controlador = require('./controlador.js')

const router = express.Router();
router.get('/', todos);
router.get('/:id', uno);



 async function todos (req, res) {
    try{
        const items = await controlador.todos(); // Llama la función todos con el nombre de la tabla
        console.log('Datos recibidos de la base de datos:', items); // Muestra los datos recibidos
        respuesta.success(req, res, items, 200); // Devuelve los datos al cliente
    }catch{
        console.error('Error al obtener el cliente:', error);
        respuesta.error(req, res, err, 500); // Maneja el error
    }
};

 async function uno (req, res) {
    try{
        const items = await controlador.uno(req.params.id); // Llama la función todos con el nombre de la tabla
    console.log('Datos recibidos de la base de datos:', items); // Muestra los datos recibidos
    respuesta.success(req, res, items, 200); // Devuelve los datos al cliente
    }catch(error){
        console.error('Error al obtener el cliente:', error);
        respuesta.error(req, res, err, 500); // Maneja el error
    }
    
};

module.exports = router;
const express = require('express');

const respuesta = require('../../red/respuestas.js');
const controlador = require('./controlador.js')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const items = await controlador.todos('clientes'); // Llama la función todos con el nombre de la tabla
        console.log('Datos recibidos de la base de datos:', items); // Muestra los datos recibidos
        respuesta.success(req, res, items, 200); // Devuelve los datos al cliente
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        respuesta.error(req, res, 'Error al obtener los clientes', 500); // Maneja el error
    }
});

module.exports = router;
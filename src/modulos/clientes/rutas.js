const express = require('express');
const respuesta = require('../../red/respuestas.js');
const controlador = require('./controlador.js');
const router = express.Router();

// Rutas
router.get('/', todos);
router.get('/:id', uno);
router.delete('/:id', eliminar);  // Cambié PUT por DELETE para eliminar correctamente

// Función para obtener todos los clientes
async function todos (req, res) {
    try {
        const items = await controlador.todos(); // Llama la función todos con el nombre de la tabla
        console.log('Datos recibidos de la base de datos:', items); // Muestra los datos recibidos
        respuesta.success(req, res, items, 200); // Devuelve los datos al cliente
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        respuesta.error(req, res, error, 500); // Maneja el error
    }
};

// Función para obtener un cliente por ID
async function uno (req, res) {
    try {
        const items = await controlador.uno(req.params.id); // Llama la función uno con el ID de cliente
        console.log('Datos recibidos de la base de datos:', items); // Muestra los datos recibidos
        respuesta.success(req, res, items, 200); // Devuelve los datos al cliente
    } catch (error) {
        console.error('Error al obtener el cliente:', error);
        respuesta.error(req, res, error, 500); // Maneja el error
    }
};

// Función para eliminar un cliente
async function eliminar (req, res) {
    try {
        const items = await controlador.eliminar(req.body); // Llama la función eliminar con los datos del cliente
        respuesta.success(req, res, 'Cliente eliminado correctamente', 200); // Devuelve mensaje al cliente
    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        respuesta.error(req, res, error, 500); // Maneja el error
    }
};

module.exports = router;

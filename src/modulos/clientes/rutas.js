const express = require('express');

const respuesta = require('../../red/respuestas.js');

const router = express.Router();

router.get('/', function (req, res){
    respuesta.success(req, res, 'todo ok', 200)
});

module.exports = router;
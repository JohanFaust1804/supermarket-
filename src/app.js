const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');


const clientes = require('./modulos/clientes/rutas');
const usuarios = require('./modulos/usuarios/rutas');
const error = require('./red/errors');
const errors = require("./red/errors");

const app = express();

// CORS
var corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200

}

//Midleware
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 


//Config
app.set('port', config.app.port);

//rutas
app.use('/api/clientes', clientes);
app.use('/api/usuarios', usuarios);


module.exports = app;
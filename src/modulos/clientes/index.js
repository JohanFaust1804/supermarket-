const db = require('../../DB/mysql2');
const ctrl = require('./controlador');

module.exports = ctrl(db);
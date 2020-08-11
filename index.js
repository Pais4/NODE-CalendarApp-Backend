const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

/* CREAMOS EL SERVIDOR DE EXPRESS */
const app = express();

/* BASE DE DATOS */
dbConnection();

/* HABILITAMOS EL CORS */
app.use( cors() );

/* DIRECTORIO PUBLICO */
/* EL USE EN EXPRESS ES CONOCIDO COMO UN MIDDLEWARE */
app.use( express.static('public') );

/* LECTURA Y PARSEO DEL BODY, PASAMOS TODAS LAS PETICIONES POR OTRO MIDDLEWARE */
app.use( express.json() );

/* RUTAS */
app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/events', require('./routes/events') );

/* ESCUCHAR PETICIONES */
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
});
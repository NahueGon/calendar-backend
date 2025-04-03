const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./db/config')

// Create express server
const app = express();

//  Data Base
dbConnection();

// CORS 
app.use(cors());

// public adress
app.use( express.static('public') )

// reading and parsing to body
app.use( express.json() );

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Listen request
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});
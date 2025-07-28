// index.js
require('dotenv').config({ quiet: true });
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const { PORT } = process.env;

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.static('public'));

// Prefijo API
app.use('/api/users', userRoutes);

// Arrancar servidor
app.listen(PORT, () =>
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
);

// config/db.js
const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

module.exports = async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB conectado Correctamente');
    } catch (err) {
        console.error('Error al conectar a MongoDB:', err.message);
        process.exit(1);
    }
};

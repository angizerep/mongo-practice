// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    edad: { type: Number, default: 0 },
    fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);

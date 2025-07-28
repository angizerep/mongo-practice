// controllers/userController.js
const User = require('../models/User');

// GET /api/users
exports.getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST /api/users
exports.create = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const newUser = new User({ name, email, age });
        const saved = await newUser.save();
        res.status(201).json(saved);
    } catch (err) {
        // Manejo de email duplicado
        if (err.code === 11000 && err.keyValue?.email) {
            return res
                .status(400)
                .json({ error: 'El email ya está registrado. Por favor usa otro.' });
        }
        // Otros errores de validación
        res.status(400).json({ error: err.message });
    }
};

// PUT /api/users/:id
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await User.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
                context: 'query'
            }
        );
        res.json(updated);
    } catch (err) {
        // Manejo de email duplicado al actualizar
        if (err.code === 11000 && err.keyValue?.email) {
            return res
                .status(400)
                .json({ error: 'El email ya está registrado. Por favor usa otro.' });
        }
        res.status(400).json({ error: err.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user)
            return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
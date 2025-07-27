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
        const { nombre, email, edad } = req.body;
        const newUser = new User({ nombre, email, edad });
        const saved = await newUser.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// PUT /api/users/:id
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

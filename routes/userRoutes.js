// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');

router.get('/', userCtrl.getAll);
router.post('/', userCtrl.create);
router.put('/:id', userCtrl.update);
router.get('/:id', userCtrl.getOne);

module.exports = router;

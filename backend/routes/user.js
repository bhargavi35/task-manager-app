const express = require('express');
const router = express.Router();
const { getUserById } = require('../controllers/userController');

// GET /api/users/:id
router.get('/:id', getUserById);

module.exports = router;

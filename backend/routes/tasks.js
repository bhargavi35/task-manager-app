// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth'); // Example auth middleware

router.use(authMiddleware); // Protect all task routes

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
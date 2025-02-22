const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET all tasks
router.get('/tasks', taskController.getTasks);

// POST to create a new task
router.post('/tasks', taskController.createTask);

// PUT to update an existing task by ID
router.put('/tasks/:id', taskController.updateTask);

// DELETE to remove a task by ID
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
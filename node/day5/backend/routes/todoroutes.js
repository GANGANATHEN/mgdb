const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// ✅ Fetch all To-Dos (General Route)
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find(); // Fetch all To-Dos
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch all To-Dos' });
    }
});

// ✅ Fetch To-Dos by User ID
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const todos = await Todo.find({ userId }); // Find To-Dos by userId
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get To-Dos' });
    }
});

// ✅ Add a new To-Do
router.post('/', async (req, res) => {
    const { task, userId } = req.body; // Get task and userId from request body

    // Validate input
    if (!task || !userId) {
        return res.status(400).json({ error: 'Task and userId are required' });
    }

    try {
        const todo = new Todo({ task, userId });
        await todo.save();
        res.status(201).json({ message: 'To-Do added successfully', todo });
    } catch (error) {
        console.error("❌ Error saving To-Do:", error); // Log the error in the backend
        res.status(500).json({ error: 'Failed to add To-Do', details: error.message });
    }
});


// ✅ Update a To-Do
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { task, completed } = req.body;
    try {
        const todo = await Todo.findByIdAndUpdate(id, { task, completed, updatedAt: Date.now() }, { new: true });
        res.json({ message: 'To-Do updated successfully', todo });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update To-Do' });
    }
});

// ✅ Delete a To-Do
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.findByIdAndDelete(id);
        res.json({ message: 'To-Do deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete To-Do' });
    }
});

// ✅ Mark a To-Do as completed
router.patch('/:id/complete', async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findByIdAndUpdate(id, { completed: true, updatedAt: Date.now() }, { new: true });
        res.json({ message: 'To-Do marked as completed', todo });
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark To-Do as completed' });
    }
});

module.exports = router;

const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// Create a new todo
router.post("/", async (req, res) => {
    const newTodo = new Todo({
        title: req.body.title,
    });
    try {
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all todos
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a todo
router.put("/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json("Todo deleted.");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

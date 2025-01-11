const express = require('express');
const router = express.Router();
const Book = require('../models/bookModel');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

router.post("/", authenticateToken, isAdmin, async (req, res) => {
    try {
        const newBook = await Book.insertMany(req.body);
        res.json({ message: "Book created successfully", newBook });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.get("/", authenticateToken, async (req, res) => {
    try {
        const books = await Book.find().populate('assignedTo', "username userEmail -_id");
        res.json(books);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(book);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.put("/:title", async (req, res) => {
    try {
        const book = await Book.findOne({ title: req.params.title });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        Object.assign(book, req.body);
        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.delete("/:title", async (req, res) => {
    try {
        const book = await Book.deleteOne({ title: req.params.title });
        if (book.deletedCount === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json({ message: "Book deleted successfully" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.get("/genre/:genre", async (req, res) => {
    try {
        const books = await Book.find({ genre: req.params.genre });
        res.json(books);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;
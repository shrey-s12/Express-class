const express = require('express');
const router = express.Router();

const bookCollection = require('../models/bookModel');

router.post("/", async (req, res) => {
    const { title, author, publishedDate, genre, price } = req.body;
    try {
        const newBook = new bookCollection({ title, author, publishedDate, genre, price });
        const book = await newBook.save();
        res.json({ message: "Book created successfully", book });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const books = await bookCollection.find();
        res.json(books);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.put("/:title", async (req, res) => {
    try {
        const book = await bookCollection.findOne({ title: req.params.title });
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
        const book = await bookCollection.deleteOne({ title: req.params.title });
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
        const books = await bookCollection.find({ genre: req.params.genre });
        res.json(books);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;
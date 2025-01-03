const express = require('express');
const router = express.Router();
const Book = require('../models/bookModel');
const User = require('../models/userModel');
const BorrowedBooks = require('../models/borrowedBooksModel');

router.post("/", async (req, res) => {
    const { title, author, publishedDate, genre, price } = req.body;
    try {
        const newBook = new Book({ title, author, publishedDate, genre, price });
        const book = await newBook.save();
        res.json({ message: "Book created successfully", book });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})

router.post("/users", async (req, res) => {
    const { username } = req.body;
    try {
        const newUser = new User({ username });
        const user = await newUser.save();
        res.json({ message: "User created successfully", user });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.post("/:id/borrow", async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ username });
        const book = await Book.findById(req.params.id);
        console.log(book)
        console.log(book._id)
        const borrowedBook = await BorrowedBooks({ bookId: book._id });
        console.log(borrowedBook)
        user.borrowedBooks.push(borrowedBook);
        const result = await user.save();
        res.json(result);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
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
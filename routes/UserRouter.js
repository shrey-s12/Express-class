const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Book = require('../models/bookModel');
const User = require('../models/userModel');
const BorrowedBooks = require('../models/borrowedBooksModel');
const { isAdmin } = require('../middleware/authMiddleware');

router.get("/", async (req, res) => {
    try {
        const users = await User.find().populate('borrowedBooks', "title authorName publishedDate genre price -_id");
        res.json(users);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.post('/', isAdmin, async (req, res) => {
    const { username, userEmail, password, role } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hasPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ username, userEmail, password: hasPassword, role });
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put("/:id/borrow", async (req, res) => {
    const userId = req.params.id;
    const { bookId } = req.body;
    try {
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        if (!user || !book) {
            return res.status(404).json({ message: 'User or Book not found' });
        }

        if (!book.availability) {
            return res.status(400).json({ message: 'Book is already borrowed' });
        }

        book.availability = false;

        const borrowRecord = new BorrowedBooks({
            bookId: book._id,
            userId: user._id,
            dateIssued: new Date(),
        });

        await borrowRecord.save();

        user.borrowedBooks.push(book._id);
        book.assignedTo.push(user._id);

        await user.save();
        await book.save();

        res.json({ message: 'Book borrowed successfully', user, book, borrowRecord });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put("/:id/return", async (req, res) => {
    const userId = req.params.id;
    const { bookId } = req.body;
    try {
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        const borrowRecord = await BorrowedBooks.findOneAndDelete({
            bookId: book._id,
            userId: user._id,
        });

        if (!borrowRecord) {
            return res.status(404).json({ message: "Borrow record not found" });
        }
        book.availability = true;

        user.borrowedBooks = user.borrowedBooks.filter(id => id.toString() !== bookId);
        book.assignedTo = book.assignedTo.filter(id => id.toString() !== userId);

        await user.save();
        await book.save();

        res.json({ message: 'Book returned successfully', user, book, borrowRecord });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    try {
        const user = await User.findById(id);
        const salt = await bcrypt.genSalt();
        const hasPassword = await bcrypt.hash(password, salt);
        user.password = hasPassword;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.json({ message: err.message });
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await User.findByIdAndDelete(id);
        res.json(result);
    } catch (err) {
        res.json({ message: err.message });
    }
});

module.exports = router;
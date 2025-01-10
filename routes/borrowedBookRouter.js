const express = require('express');
const router = express.Router();

const Author = require('../models/authorModel');
const Book = require('../models/bookModel');
const User = require('../models/userModel');
const BorrowedBooks = require('../models/borrowedBooksModel');

router.get("/borrow-records", async (req, res) => {
    try {
        const borrowRecords = await BorrowedBooks.find()
            .populate("bookId", "title authorName genre price")
            .populate("userId", "username userEmail");

        res.json(borrowRecords);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

// .populate('book', "title publishedDate genre price -_id").populate('user', "name email -_id")
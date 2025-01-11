const express = require('express');
const router = express.Router();

const Author = require('../models/authorModel');
const { paginate } = require('../middleware/paginationMiddleware');

router.get("/", filterUsers, paginate, async (req, res) => {
    try {
        const authors = await Author.find().populate('books', "title publishedDate genre price -_id");
        res.json(authors);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

function filterUsers(req, res, next) {
    req.paginationResource = Author;
    next();
}

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Author.findById(id).populate('books', "title publishedDate genre price -_id");
        res.json(author);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.post("/", async (req, res) => {
    const { authorName, authorDOB, nationality, books } = req.body;
    try {
        const newAuthor = new Author({ authorName, authorDOB, nationality, books });
        const author = await newAuthor.save();
        res.json({ message: "User created successfully", author });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Author.findByIdAndDelete(id);
        res.json({ message: "Author deleted successfully", author });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;
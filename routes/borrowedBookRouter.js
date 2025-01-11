const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middleware/authMiddleware');
const { borrowedBooksMiddleware } = require('../middleware/borrowedBookMiddleware');

router.get("/borrow-records", authenticateToken, borrowedBooksMiddleware, (req, res) => {
    res.json(req.borrowRecords);
});

module.exports = router;
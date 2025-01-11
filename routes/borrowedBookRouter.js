const express = require('express');
const router = express.Router();

const { borrowedBooksMiddleware } = require('../middleware/borrowedBookMiddleware');

router.get("/borrow-records", borrowedBooksMiddleware, (req, res) => {
    res.json(req.borrowRecords);
});

module.exports = router;
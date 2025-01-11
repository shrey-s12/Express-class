const BorrowedBooks = require("../models/borrowedBooksModel");

async function borrowedBooksMiddleware(req, res, next) {
    try {
        let borrowRecords;

        if (req.user.role === "admin") {
            borrowRecords = await BorrowedBooks.find()
                .populate("bookId", "title authorName genre price")
                .populate("userId", "username userEmail");
        } else {
            const userId = req.user.userId;
            borrowRecords = await BorrowedBooks.find({ userId })
                .populate('bookId', 'title authorName genre price dueDate returnedDate')
                .populate("userId", "username userEmail");
        }

        req.borrowRecords = borrowRecords;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    borrowedBooksMiddleware
}
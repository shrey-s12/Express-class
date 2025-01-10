const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BorrowedBooksSchema = new Schema({
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateIssued: {
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: Date,
        default: function () {
            const due = new Date();
            due.setDate(due.getDate() + 7);
            return due;
        },
    },
    returnedDate: {
        type: Date
    },
    availability: {
        type: Boolean,
        default: true
    }
});

const BorrowedBooks = mongoose.model("BorrowedBooks", BorrowedBooksSchema);

module.exports = BorrowedBooks;
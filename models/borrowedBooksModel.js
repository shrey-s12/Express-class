const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const borrowedBooksSchema = new Schema({
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    dateIssued: {
        type: Date,
        default: new Date(Date.now()).toISOString().split('T')[0]
    },
    dueDate: {
        type: Date,
        default: new Date(Date.now()).toISOString().split('T')[0] + (7 * 24 * 60 * 60 * 1000)
    },
    returnedDate: {
        type: Date
    }
});

const BorrowedBooks = mongoose.model("BorrowedBooks", borrowedBooksSchema);

module.exports = BorrowedBooks;
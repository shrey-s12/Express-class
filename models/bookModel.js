const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date
    },
    genre: {
        type: String
    },
    price: {
        type: Number,
        min: 0
    }
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
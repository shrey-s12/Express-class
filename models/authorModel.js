const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    authorName: {
        type: String,
        required: true,
    },
    authorDOB: {
        type: Date,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    books: {
        type: [Schema.Types.ObjectId],
        ref: 'Book',
        default: [],
    }
});

const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;
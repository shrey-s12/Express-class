const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
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
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
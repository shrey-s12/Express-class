const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    borrowedBooks: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
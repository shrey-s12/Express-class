const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    borrowedBooks: {
        type: [Schema.Types.ObjectId],
        ref: 'Book',
        default: [],
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
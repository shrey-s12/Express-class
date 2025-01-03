const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clubSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    students: {
        type: [Schema.Types.ObjectId],
        ref: 'Student'
    }
});

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;
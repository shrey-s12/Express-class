const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    subjects: {
        type: [String],
        default: ["Math"]
    },
    gpa: Number
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
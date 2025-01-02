const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    subjectName: String,
    score: Number,
    maxScore: Number,
    testDate: {
        type: Date,
        default: Date.now
    }
});

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
    gpa: Number,
    grades: {
        type: [gradeSchema],
        default: []
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    clubs: {
        type: [Schema.Types.ObjectId],
        ref: 'Club'
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
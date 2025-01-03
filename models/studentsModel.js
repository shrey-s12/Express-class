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
    clubs: [{
        _id: Schema.Types.ObjectId,
        name: String,
    }],
});

// Calculate the GPA of a student
studentSchema.method.calculateGPA = function () {
    if (!this.grades.length) return 0;

    const totalScore = this.grades.reduce((sum, grade) => sum + grade.score, 0);
    const totalMaxScore = this.grades.reduce((sum, grade) => sum + grade.maxScore, 0);
    return (totalScore / totalMaxScore) * 10;
}

// Virtuals
studentSchema.virtual('currentGPA').get(function () {
    return this.calculateGPA();
});

studentSchema.set('toJSON', { virtuals: true });

// Middleware
studentSchema.pre('save', function (next) {
    console.log(`Student ${this.name} is being saved`);
    this.updatedAt = Date.now();
    next();
});

studentSchema.pre('update', function (doc, next) {
    console.log(`Student ${doc.name} is being updated`);
    next();
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

// Custom Validation
// validate: {
//     validator: val => val % 2 === 0,
//     message: prop => `${prop.value} is not an even Number`,
// }
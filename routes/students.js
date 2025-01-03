const express = require('express');
const router = express.Router();
const Student = require('../models/studentsModel');
const Profile = require('../models/profileModel');
const Club = require('../models/clubModel');

router.get("/", async (req, res) => {
    try {
        const students = await Student.find().populate("profile clubs");
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate("profile");
        const currentGPA = student.calculateGPA;
        console.log(currentGPA, "currentGPA");
        res.json({ student, currentGPA });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/:id/club", async (req, res) => {
    try {
        const club = await Club.findById(req.body._id);
        const student = await Student.findById(req.params.id);

        if (club.students.includes(student.id)) {
            return res.status(400).json({ message: "Student already in club" });
        }

        club.students.push(student.id);
        await club.save();

        student.clubs.push({ _id: club.id, name: club.name });
        const ack = await student.save();

        res.json(ack);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/:id/profile", async (req, res) => {
    try {
        const newProfile = new Profile(req.body);
        const profile = await newProfile.save();

        const student = await Student.findById(req.params.id);
        student.profile = profile._id;
        const ack = await student.save();
        res.json(ack);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Post request for student
router.post("/", async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        const student = await newStudent.save();
        res.json(student);

        // 2nd way to create a new student
        // const students = await Student.create({ name, age, subjects, gpa });
        // res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update the grade of a student
router.patch("/:id/grade", async (req, res) => {
    try {
        const students = await Student.findById(req.params.id);
        students.grades.push(req.body);
        const ack = await students.save();
        res.json(ack);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// Update the student
router.patch("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        Object.assign(student, req.body);
        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const students = await Student.findByIdAndDelete(req.params.id);
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
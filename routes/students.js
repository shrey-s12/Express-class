const express = require('express');
const router = express.Router();
// const db = require('../connection');
// const collection = db.collection('students');
// const mongodb = require('mongodb');

const collection = require('../models/studentsModel');

router.get("/", async (req, res) => {
    try {
        const students = await collection.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const students = await collection.findById(req.params.id);
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    const { name, age, subjects, gpa } = req.body;
    try {
        // const newStudents = new collection(req.body);
        // const student = await newStudents.save();
        // res.json(student);

        // 2nd way to create a new student
        const students = await collection.create({ name, age, subjects, gpa });
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const student = await collection.findById(req.params.id);
        Object.assign(student, req.body);
        const updatedStudent = await collection.save();
        res.json(updatedStudent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const students = await collection.findByIdAndDelete(req.params.id);
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
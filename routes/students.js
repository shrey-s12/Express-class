const express = require('express');
const router = express.Router();
const db = require('../connection');
const collection = db.collection('students');
const mongodb = require('mongodb');

router.get("/", async (req, res) => {
    try {
        const students = await collection.find().toArray();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", getObjectId, async (req, res) => {
    try {
        const students = await collection.findOne({
            _id: req.o_id,
        })
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    const { name, age, subjects, gpa } = req.body;
    try {
        const student = await collection.insertOne({
            name: name,
            age: age,
            subjects: subjects,
            gpa: gpa,
        });
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch("/:id", getObjectId, async (req, res) => {
    const { name, age, subjects, gpa } = req.body;
    try {
        const student = await collection.updateOne({
            _id: req.o_id,
        }, {
            $set: {
                name: name,
                age: age,
                subjects: subjects,
                gpa: gpa,
            }
        });
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", getObjectId, async (req, res) => {
    try {
        const students = await collection.deleteOne({
            _id: req.o_id,
        });
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to convert string id to mongodb object id
function getObjectId(req, res, next) {
    const { id } = req.params;
    // Convert string id to mongodb object id
    const o_id = new mongodb.ObjectId(id);
    req.o_id = o_id;
    next();
}


module.exports = router;
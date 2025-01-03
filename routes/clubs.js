const express = require('express');
const router = express.Router();
const Student = require('../models/studentsModel');
const Club = require('../models/clubModel');

router.get("/", async (req, res) => {
    try {
        const clubs = await Club.find();
        res.json(clubs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const club = await Club.findById(req.params.id);
        // const students = await Student.find({ clubs: club.id }).populate("profile clubs");
        res.json(club);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const newClub = new Club(req.body);
        const club = await newClub.save();
        res.json(club);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;
const express = require('express');
const fs = require('fs');
const router = express.Router();

router.use(readData);

router.get("/", (req, res) => {
    console.log(req.method);
    console.log(req.url);
    console.log(req.query);
    res.json(req.students);
});

router.get("/:id", getStudentById, (req, res) => {
    console.log("Fetching:", req.params.id);
    res.json(req.student);
});

router.post("/", writeData, (req, res) => {
    console.log(req.body);
    let students = req.students;
    const { id, name } = req.body;
    const newStudent = { id, name };
    students.push(newStudent);

    res.saveStudents(students, res => res.json({ message: "Added successfully" }))
});

router.patch("/:id", writeData, (req, res) => {
    console.log("Editing:", req.params.id);
    console.log(req.body);
    let students = req.students;
    students = students.map(student => {
        return student.id == req.params.id ? { ...student, ...req.body, id: req.params.id } : student;
    });
    res.saveStudents(students, res => res.json({ message: "Updated successfully" }));
});

router.delete("/:id", writeData, (req, res) => {
    console.log("Deleting:", req.params.id);
    let students = req.students;
    students = students.filter(student => student.id != req.params.id);
    res.saveStudents(students, res => res.json({ message: "Deleted successfully" }));
});

// Middleware to read data from file
function readData(req, res, next) {
    fs.readFile('./students.json', function (err, data) {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "unable to open a file on server" });
            return;
        }
        req.students = JSON.parse(data);
        next();
    });
}

// Middleware to get student by id
function getStudentById(req, res, next) {
    const students = req.students;
    req.student = students.find(student => student.id == req.params.id);
    if (!req.student) {
        res.status(404).json({ message: "Student not found" });
        return;
    }
    next();
}

function writeData(req, res, next) {
    res.saveStudents = (students, resCallback) => {
        fs.writeFile('./students.json', JSON.stringify(students), function (err) {
            if (err) {
                console.error(err);
                res.status(500).json({ message: "unable to open a file while writing on server" });
                return;
            }
            resCallback(res);
        })
    };
    next();
}

module.exports = router;
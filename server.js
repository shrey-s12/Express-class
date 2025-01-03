// const express = require('express');
// const fs = require('fs');
// const url = require('url');

// const app = express();

// // Middleware to parse JSON data
// app.use(express.json());

// app.get('/', (req, res) => {
//     // const parsedUrl = url.parse(req.url, true);
//     // console.log(parsedUrl);
//     fs.readFile('./data.json', (err, data) => {
//         if (err) {
//             return res.status(500).json({ message: 'An error occurred' });
//         }
//         res.json(JSON.parse(data));
//     });
// });

// app.post('/', (req, res) => {
//     const newdata = req.body;
//     fs.readFile('./data.json', (err, data) => {
//         if (err) {
//             return res.status(500).json({ message: 'An error occurred' });
//         }

//         let jsonData = JSON.parse(data);
//         jsonData.push(newdata);

//         fs.writeFile('./data.json', JSON.stringify(jsonData), (err) => {
//             if (err) {
//                 return res.status(500).json({ message: 'An error occurred' });
//             }
//             res.json({ message: 'Data written to file' });
//         });
//     });
// });

// app.put("/", (req, res) => {
//     const updatedData = req.body;
//     fs.readFile('./data.json', (err, data) => {
//         if (err) {
//             return res.status(500).json({ message: 'An error occurred' });
//         }

//         let jsonData = JSON.parse(data);

//         const itemIndex = jsonData.findIndex(item => item.id === updatedData.id);
//         if (itemIndex === -1) {
//             return res.status(404).json({ message: 'Item not found' });
//         }

//         jsonData[itemIndex] = { ...jsonData[itemIndex], ...updatedData };

//         fs.writeFile('./data.json', JSON.stringify(jsonData), (err) => {
//             if (err) {
//                 return res.status(500).json({ message: 'An error occurred' });
//             }
//             res.json({ message: 'Data Update to file' });
//         });
//     });
// });

// app.delete("/", (req, res) => {
//     const { id } = req.body;
//     fs.readFile('./data.json', (err, data) => {
//         if (err) {
//             return res.status(500).json({ message: 'An error occurred' });
//         }

//         let jsonData = JSON.parse(data);

//         const updatedData = jsonData.filter(item => item.id !== id);

//         if (jsonData.length === updatedData.length) {
//             return res.status(404).json({ message: 'Item not found' });
//         }

//         fs.writeFile('./data.json', JSON.stringify(updatedData), (err) => {
//             if (err) {
//                 return res.status(500).json({ message: 'An error occurred' });
//             }
//             res.json({ message: 'Item deleted successfully' });
//         });
//     });
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

// ---------------------------------------------Sir---------------------------------------------

const dorenv = require('dotenv');
dorenv.config();

const express = require('express');
const studentsRoues = require('./routes/students');
const clubRoutes = require('./routes/clubs');
require('./mongoose_conn');

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/students", studentsRoues);
app.use("/clubs", clubRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
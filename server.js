const dorenv = require('dotenv');
dorenv.config();

const express = require('express');
require('./mongoose_connection');
const booksRouter = require('./routes/booksRouter');

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/books", booksRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const dorenv = require('dotenv');
dorenv.config();

const express = require('express');
require('./mongoose_connection');
const booksRouter = require('./routes/booksRouter');
const userRouter = require('./routes/userRouter');
const authorRouter = require('./routes/authorRouter');
const borrowedBookRouter = require('./routes/borrowedBookRouter');

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/books", booksRouter);
app.use("/users", userRouter);
app.use("/authors", authorRouter);
app.use("/borrowedBooks", borrowedBookRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
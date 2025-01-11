const dorenv = require('dotenv');
dorenv.config();

const express = require('express');
require('./mongoose_connection');
const booksRouter = require('./routes/booksRouter');
const userRouter = require('./routes/userRouter');
const authorRouter = require('./routes/authorRouter');
const borrowedBookRouter = require('./routes/borrowedBookRouter');
const { authenticateToken } = require('./middleware/authMiddleware');

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/authors", authorRouter);
app.use("/books", authenticateToken, booksRouter);
app.use("/users", authenticateToken, userRouter);
app.use("/borrowedBooks", authenticateToken, borrowedBookRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const dorenv = require('dotenv');
dorenv.config();

const express = require('express');
require('./mongoose_connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT2; // 5001
const SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

const User = require('./models/userModel');

app.use(express.json());

const sessions = new Set();

app.post("/login", async (req, res) => {
    const { userEmail, password } = req.body;
    const user = await User.findOne({ userEmail });
    // console.log(user);
    if (!user) {
        return res.status(400).json({ message: 'User not Found' });
    }
    try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect Password' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    const userInfo = { userEmail: user.userEmail, username: user.username };
    const token = jwt.sign(userInfo, SECRET, { expiresIn: "30m" });
    return res.json(token);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
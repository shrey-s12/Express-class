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

app.post("/token", (req, res) => {
    const refresh_token = req.body.token;
    if (!refresh_token) return res.status(401).json({ message: "Unauthorized" });
    if (!sessions.has(refresh_token)) return res.status(401).json({ message: "You need to login!" });

    jwt.verify(refresh_token, REFRESH_SECRET, function (err, token_data) {
        if (err) return res.status(403).json({ message: "Forbidden", error: err });

        // {user: token_data.user} Remove "iat"(Time Stamp) from the data
        const token = generateAccessToken({ user: token_data.user });
        return res.json({ token });
    })
});

app.post("/login", async (req, res) => {
    const { userEmail, password } = req.body;
    const user = await User.findOne({ userEmail });
    console.log(user);
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

    const userInfo = { userId: user._id, userEmail: user.userEmail, role: user.role };
    const token_data = { user: userInfo };

    const refresh_token = jwt.sign(token_data, REFRESH_SECRET);
    sessions.add(refresh_token);

    const token = generateAccessToken(token_data);

    return res.json({ token, refresh_token });
});

function generateAccessToken(data) {
    return jwt.sign(data, SECRET, { expiresIn: "2m" });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

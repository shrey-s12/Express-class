const jwt = require('jsonwebtoken');
const SECRET = process.env.ACCESS_TOKEN_SECRET;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'You need To login!' });
    }
    jwt.verify(token, SECRET, function (err, token_data) {
        if (err) return res.status(400).json({ message: "Forbidden", error: err });

        req.user = token_data.user;
        next();
    });
};

function isAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};

module.exports = {
    authenticateToken,
    isAdmin
}
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.cookies?.access;

    if (!token) {
        return res.json({
            message: "Access token required"
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
}

module.exports = auth
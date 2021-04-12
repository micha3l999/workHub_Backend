const jwt = require('jsonwebtoken');
const User = require('../user/user');

const authenticateToken = async function authenticateAccessToken(req, res, next) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = await User.findById(decoded.id).select("-phone");
            return next();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: "Unauthorized" });
    }
}

module.exports = authenticateToken;
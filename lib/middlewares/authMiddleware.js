const jwt = require('jsonwebtoken');
const User = require('../user/user');

const authenticateToken = async function authenticateAccessToken(req, res, next) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = await User.findById({_id: decoded.id}, { phone: 0 }, { lean: true }).populate('sellerId');
            return next();
        } catch (error) {
            res.status(400).json({ error: "Unauthorized" });
            logger.error(`Unauthorized - ${token}`);
            //res.status(400).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: "Unauthorized" });
        logger.error(`Unauthorized - ${req.headers.authorization}`);
    }
}

module.exports = authenticateToken;
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const generateToken = function generateAccesTokenLogin(id) {
    return jwt.sign(id, process.env.TOKEN_SECRET, { expiresIn: "30d"});
}

module.exports = generateToken;
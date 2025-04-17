require('dotenv').config();
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {

    const accessToken = req.headers.access_token;
    if (!accessToken) {
        return res.status(401).json({ msg: 'Access token is missing' });
    }
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ msg: 'Invalid or expired access token' });
    }
}
module.exports = validateToken;
const jwt = require('jsonwebtoken');
require('dotenv').config();


const FetchUser = (req, res, next)=>{
    const token = req.header('auth-token');

    if (!token) return res.status(401).send({ success: false, message: 'Please authenticate.' });
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified.user;
        next();
    } catch (error) {
        res.status(400).send({ success: false, message: 'Invalid Token' });
    }
}

module.exports = FetchUser;
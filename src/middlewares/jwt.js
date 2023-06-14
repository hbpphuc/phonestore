const jwt = require('jsonwebtoken');

const createAccessToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET_KEY, {
        expiresIn: '2h',
    });
};

const createRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

module.exports = { createAccessToken, createRefreshToken };

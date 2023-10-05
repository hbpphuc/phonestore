const jwt = require('jsonwebtoken');

const createAccessToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
};

const createRefreshToken = (id, email, accessToken) => {
    return jwt.sign({ id, email, accessToken }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
};

module.exports = { createAccessToken, createRefreshToken };

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { AppError } = require('../utils');
const { createAccessToken, createRefreshToken } = require('../middlewares/jwt');

const sendToken = asyncHandler(async (user, statusCode, req, res) => {
    const token = createAccessToken(user._id, user.email);

    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    });

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
});

exports.signup = asyncHandler(async (req, res, next) => {
    const newUser = await User.create(req.body);

    sendToken(newUser, 201, req, res);
});

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return next(new AppError('Please enter email and password.', 400));

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password)))
        return next(new AppError('Incorrect email or password.', 401));

    sendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        status: 'success',
    });
};

exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token)
        return next(
            new AppError(
                'You are not logged in. Please logged in to get access!',
                401
            )
        );

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const currentUser = await User.findById(decode.id);

    if (!currentUser)
        return next(
            new AppError(
                'The user belonging to this token does not no longer exist.',
                401
            )
        );

    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});

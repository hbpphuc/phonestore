const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { createAccessToken, createRefreshToken } = require('../middlewares/jwt');
const { AppError, Email } = require('../utils');
const { findOne } = require('../models/userModel');

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

    // const url = `${req.protocol}://${req.get('host')}`;
    // await new Email(newUser, url).sendWelcome();
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

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    'You do not have permission to perform this action',
                    403
                )
            );
        }
        next();
    };
};

exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
        return next(
            new AppError('There is no user with this email address.', 404)
        );

    const resetToken = user.createResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // send Email

    try {
        const url = `${req.protocol}://${req.get(
            'host'
        )}/api/v1/users/resetPassword/${resetToken}`;
        await new Email(user, url).sendResetPassword();

        res.status(200).json({
            status: 'success',
            message: 'Request sent to email!',
        });
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(
            new AppError(
                'There was an error sending the email! Please try later!',
                500
            )
        );
    }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) return next(new AppError('Invalid token or has expired!', 400));
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    sendToken(user, 200, req, res);
});

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const uniqid = require('uniqid');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { createAccessToken, createRefreshToken } = require('../middlewares/jwt');
const { AppError, Email } = require('../utils');

const sendToken = asyncHandler(async (user, statusCode, req, res) => {
    const accessToken = createAccessToken(user._id, user.email);

    res.cookie('jwt', accessToken, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: false,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        sameSite: process.env.NODE_ENV === 'development' ? '' : 'none',
    });

    const refreshToken = createRefreshToken(user._id, user.email, accessToken);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        accessToken,
        data: {
            user,
        },
    });
});

exports.refreshToken = asyncHandler(async (req, res, next) => {
    let accToken;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        accToken = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        accToken = req.cookies.jwt;
    }

    if (!accToken) {
        return next(new AppError('Access token is invalid.', 400));
    }

    const decodedAccess = jwt.verify(accToken, process.env.JWT_SECRET_KEY, {
        ignoreExpiration: true,
    });

    const user = await User.findById(decodedAccess.id).select('refreshToken');

    if (!user) {
        return next(new AppError('This user is not exist.', 404));
    }

    if (!user.refreshToken) {
        return next(new AppError('Refresh token is invalid.', 400));
    }

    const decodedRefresh = jwt.verify(
        user.refreshToken,
        process.env.JWT_SECRET_KEY,
        {
            ignoreExpiration: true,
        }
    );

    if (decodedRefresh.exp < new Date().getTime() / 1000) {
        return next(new AppError('You are not log in.', 401));
    }

    const accessToken = createAccessToken(user._id, user.email);

    res.cookie('jwt', accessToken, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: false,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        sameSite: process.env.NODE_ENV === 'development' ? '' : 'none',
    });

    if (!accessToken) {
        return next(
            new AppError(
                'Oops! Can not create access token, please try again!',
                400
            )
        );
    }

    return res.status(200).json({
        status: 'success',
        accessToken,
        data: {
            user,
        },
    });
});

exports.requestSignup = asyncHandler(async (req, res, next) => {
    const { name, email, password, passwordConfirm } = req.body;

    if (password !== passwordConfirm)
        return next(new AppError('Password does not match.', 400));

    if (password.length < 8 && passwordConfirm.length < 8)
        return next(
            new AppError(
                'Password must be more than or equal 8 characters.',
                400
            )
        );

    const userChecked = await User.findOne({ email });

    if (userChecked)
        return next(new AppError('This email is already exist.', 400));

    const tempToken = uniqid();

    res.cookie(
        'registerInfo',
        { ...req.body, token: tempToken },
        {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: false,
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
            sameSite: process.env.NODE_ENV === 'development' ? '' : 'none',
        }
    );

    const url = `${req.protocol}://${req.get(
        'host'
    )}/api/v1/users/signup/${tempToken}`;
    await new Email({ email, name }, url).sendRegister();

    res.status(200).json({
        status: 'success',
        data: {
            message: 'Send register email successfully!',
        },
    });
});

exports.signup = asyncHandler(async (req, res, next) => {
    const cookie = req.cookies;
    const { token } = req.params;

    if (!cookie || cookie?.registerInfo?.token !== token) {
        res.clearCookie('registerInfo');
        return res.redirect(`${process.env.CLIENT_URL}/signup/fail`);
    }

    await User.create({
        name: cookie?.registerInfo?.name,
        email: cookie?.registerInfo?.email,
        password: cookie?.registerInfo?.password,
        passwordConfirm: cookie?.registerInfo?.passwordConfirm,
    });

    res.clearCookie('registerInfo');
    res.cookie('signupToken', token, {
        expires: new Date(Date.now() + 2 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        sameSite: process.env.NODE_ENV === 'development' ? '' : 'none',
    });
    res.redirect(`${process.env.CLIENT_URL}/signup/success`);
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

exports.redirectGG = asyncHandler(async (req, res, next) => {
    const accessToken = createAccessToken(req.user._id, req.user.email);

    res.cookie('jwt', accessToken, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: false,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        sameSite: process.env.NODE_ENV === 'development' ? '' : 'none',
    });

    const user = await User.findById(req.user._id);
    const refreshToken = createRefreshToken(user._id, user.email, accessToken);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    res.redirect(`${process.env.CLIENT_URL}/login/google/success`);
});

exports.logout = (req, res) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now()),
        httpOnly: false,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        sameSite: process.env.NODE_ENV === 'development' ? '' : 'none',
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
        return next(new AppError('Please logged in to get access!', 401));

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
            new AppError('Not found user with this email address.', 404)
        );

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const { email, name } = user;

    // send Email
    try {
        const url = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        await new Email({ email, name }, url).sendResetPassword();

        res.status(200).json({
            status: 'success',
            message: 'Request sent to your email!',
        });
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(
            new AppError('Sending the email failure! Please try later!', 500)
        );
    }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
    const { password, passwordConfirm } = req.body;

    if (password !== passwordConfirm)
        return next(new AppError('Password does not match.', 400));

    if (password.length < 8 && passwordConfirm.length < 8)
        return next(
            new AppError(
                'Password must be more than or equal 8 characters.',
                400
            )
        );

    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
        return next(new AppError('Invalid token or has expired!', 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    sendToken(user, 200, req, res);
});

exports.updatePassword = asyncHandler(async (req, res, next) => {
    const currUser = await User.findById(req.user.id).select('+password');
    const correct = await currUser.correctPassword(
        req.body.passwordCurrent,
        currUser.password
    );

    if (!correct) {
        return next(new AppError('Your current password is wrong!', 401));
    }

    currUser.password = req.body.password;
    currUser.passwordConfirm = req.body.passwordConfirm;
    await currUser.save();

    // 4. Log user in, send JWT
    sendToken(currUser, 201, req, res);
});

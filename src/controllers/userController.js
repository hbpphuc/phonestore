const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { AppError } = require('../utils');
const crud = require('./crudHandler');

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

const filterObj = (obj, ...fields) => {
    const newObj = {};
    Object.keys(obj).forEach((item) => {
        if (fields.includes(item)) newObj[item] = obj[item];
    });
    return newObj;
};

exports.updateMe = asyncHandler(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm)
        return next(
            new AppError(
                'This route is not for update password! Please use /updatePassword',
                400
            )
        );

    const filterBody = filterObj(req.body, 'name', 'email');
    const user = await User.findByIdAndUpdate(req.user.id, filterBody, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});

exports.deleteMe = asyncHandler(async (req, res, next) => {
    await User.findByIdAndDelete(req.user.id);

    res.status(204).json({
        status: 'success',
        data: null,
    });
});

exports.getAllUser = crud.getAll(User);
exports.getUser = crud.getOne(User);
// DO NOT UPDATE PASSWORD WITH THIS
exports.updateUser = crud.updateOne(User);
exports.deleteUser = crud.deleteOne(User);

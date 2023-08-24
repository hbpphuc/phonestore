const asyncHandler = require('express-async-handler');
const uploadCloud = require('../configs/cloudinary.config');
const crud = require('./crudHandler');
const { AppError } = require('../utils');
const User = require('../models/userModel');
const Product = require('../models/productModel');

const filterObj = (obj, ...fields) => {
    const newObj = {};
    Object.keys(obj).forEach((item) => {
        if (fields.includes(item)) newObj[item] = obj[item];
    });
    return newObj;
};

exports.populatedImages = uploadCloud.single('photo');

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

exports.getCurrent = asyncHandler(async (req, res, next) => {
    const curUser = await User.findById(req.user.id);

    if (!curUser) {
        return next(new AppError('No document found with this id', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: curUser,
        },
    });
});

exports.updateMe = asyncHandler(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm)
        return next(
            new AppError(
                'This route is not for update password! Please use /updatePassword',
                400
            )
        );

    const filterBody = filterObj(req.body, 'name', 'email');
    if (req.file) filterBody.photo = req.file.path;
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

exports.updateCart = asyncHandler(async (req, res, next) => {
    const { product, quantity, color } = req.body;
    const user = await User.findById(req.user.id);
    const checkProduct = await Product.findById(product);

    if (!checkProduct) {
        return next(new AppError('This product does not exist.', 404));
    }

    if (quantity > checkProduct.quantity) {
        return next(
            new AppError(
                `This product only has ${checkProduct.quantity} in stock.`,
                409
            )
        );
    }

    const productInCart = user?.cart?.find(
        (item) => item.product.toString() === product && item.color === color
    );

    let curCart;

    if (productInCart) {
        productInCart.quantity = quantity;
        curCart = await user.save({ validateBeforeSave: false });
    } else {
        curCart = await User.findByIdAndUpdate(
            req.user.id,
            {
                $push: { cart: req.body },
            },
            { new: true }
        );
    }

    res.status(200).json({
        status: 'success',
        data: {
            curCart,
        },
    });
});

exports.getAllUser = crud.getAll(User);
exports.getUser = crud.getOne(User);
// DO NOT UPDATE PASSWORD WITH THIS
exports.updateUser = crud.updateOne(User);
exports.deleteUser = crud.deleteOne(User);

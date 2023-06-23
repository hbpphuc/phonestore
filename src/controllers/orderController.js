const asyncHandler = require('express-async-handler');
const Coupon = require('../models/couponModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const { AppError } = require('../utils');
const crud = require('./crudHandler');

exports.createOrder = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).populate(
        'cart.product',
        'name price'
    );

    if (user.cart.length === 0)
        return next(new AppError('Cart is empty.', 404));

    const products = user?.cart?.map((item) => ({
        product: item.product._id,
        count: item.quantity,
        color: item.color,
    }));

    let totalPrice = user?.cart?.reduce(
        (sum, item) => item.product.price * item.quantity + sum,
        0
    );

    let coupon;

    if (req.body.coupon) {
        coupon = await Coupon.findOne({
            code: { $in: req.body.coupon },
        });

        if (!coupon)
            return next(
                new AppError('Coupon code does not exist or expired.', 404)
            );

        switch (coupon.type) {
            case 'percent':
                totalPrice = Math.round(
                    totalPrice * (1 - coupon.discount / 100)
                );
                break;
            case 'price':
                totalPrice = Math.round(totalPrice - coupon.discount);
                break;
            default:
                next();
        }
    }

    const newOrder = await Order.create({
        products,
        total: totalPrice,
        coupon: coupon?.name ?? '',
        orderBy: req.user.id,
    });

    user.cart = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(201).json({
        status: 'success',
        data: {
            newOrder,
        },
    });
});

exports.getUserOrder = asyncHandler(async (req, res, next) => {
    const userOrder = await Order.find({ orderBy: req.user._id });

    res.status(200).json({
        status: 'success',
        data: {
            userOrder,
        },
    });
});

exports.getAllOrder = crud.getAll(Order);
exports.getOrder = crud.getOne(Order);
exports.updateOrder = crud.updateOne(Order);
exports.deleteOrder = crud.deleteOne(Order);

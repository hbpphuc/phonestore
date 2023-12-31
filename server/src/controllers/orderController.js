const asyncHandler = require('express-async-handler');
const Stripe = require('stripe');
const Coupon = require('../models/couponModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const { AppError } = require('../utils');
const crud = require('./crudHandler');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = asyncHandler(async (req, res, next) => {
    const { cart, coupon } = req.body;

    if (cart.length === 0) return next(new AppError('Cart is empty.', 404));

    res.cookie(
        'userCart',
        { ...req.body },
        {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: false,
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
            sameSite: process.env.NODE_ENV === 'development' ? '' : 'none',
        }
    );

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get(
            'host'
        )}/api/v1/orders/createOrder`,
        cancel_url: process.env.CLIENT_URL,
        customer_email: req.user.email,
        client_reference_id: req.user._id,
        line_items: cart.map((item) => ({
            price_data: {
                product_data: {
                    name: item.product.name,
                    description: item.color,
                    images: [item.product.imageCover],
                },
                unit_amount: item.product.price * 100,
                currency: 'usd',
            },
            quantity: item.quantity,
        })),
    });

    // Create session at response
    res.status(200).json({
        status: 'success',
        data: {
            session,
        },
    });
});

exports.createOrder = asyncHandler(async (req, res, next) => {
    const cookie = req.cookies;

    if (!cookie || !cookie.userCart.cart.length === 0) {
        res.clearCookie('userCart');
        return next(new AppError('Cart is empty.', 404));
    }

    const products = cookie?.userCart?.cart?.map((item) => ({
        product: item.product._id,
        count: item.quantity,
        color: item.color,
    }));

    let totalPrice = cookie?.userCart?.cart?.reduce(
        (sum, item) => item.product.price * item.quantity + sum,
        0
    );

    await Order.create({
        products,
        total: totalPrice,
        coupon: cookie?.userCart?.coupon ?? '',
        orderBy: req.user.id,
    });

    const user = await User.findById(req.user.id);

    user.cart = undefined;
    await user.save({ validateBeforeSave: false });

    res.clearCookie('userCart');
    res.redirect(`${process.env.CLIENT_URL}/me/order`);
});

exports.getUserOrder = asyncHandler(async (req, res, next) => {
    const userOrder = await Order.find({ orderBy: req.user._id }).populate({
        path: 'products.product',
        select: 'name imageCover price',
    });

    res.status(200).json({
        status: 'success',
        data: {
            userOrder,
        },
    });
});

exports.cancelOrder = asyncHandler(async (req, res, next) => {
    const userOrder = await Order.find({ orderBy: req.user._id });

    const uor = userOrder.find((item) => item.id === req.body.oId);

    if (uor && uor.status === 'Shipping') {
        await Order.findOneAndUpdate(
            { _id: uor._id, status: 'Shipping' },
            {
                status: 'Canceled',
            },
            { new: true }
        );
    }

    res.status(200).json({
        status: 'success',
        data: {
            userOrder,
        },
    });
});

exports.getAllOrder = crud.getAll(Order, {
    path: 'products.product',
    select: 'name imageCover price',
});
exports.getOrder = crud.getOne(Order);
exports.updateOrder = crud.updateOne(Order);
exports.deleteOrder = crud.deleteOne(Order);

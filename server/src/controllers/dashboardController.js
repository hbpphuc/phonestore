const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

exports.getProductStats = asyncHandler(async (req, res, next) => {
    const stats = await Product.aggregate([
        {
            $group: {
                _id: 'products',
                numProduct: { $sum: 1 },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
            },
        },
    ]);

    res.status(200).json({
        status: 'success',
        data: { stats },
    });
});

exports.getUserStats = asyncHandler(async (req, res, next) => {
    const stats = await User.aggregate([
        {
            $group: {
                _id: 'users',
                numUser: { $sum: 1 },
            },
        },
    ]);

    res.status(200).json({
        status: 'success',
        data: { stats },
    });
});

exports.getOrderStats = asyncHandler(async (req, res, next) => {
    const stats = await Order.aggregate([
        { $match: { status: 'Delivered' } },
        {
            $group: {
                _id: '$orderBy',
                goods: { $push: '$products' },
                totalAmount: { $sum: '$total' },
            },
        },
    ]);

    res.status(200).json({
        status: 'success',
        data: { stats },
    });
});

exports.getMonthlyPlan = asyncHandler(async (req, res, next) => {
    const year = req.params.year * 1;
    const plan = await Order.aggregate([
        {
            $match: {
                status: 'Delivered',
                createdAt: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                },
            },
        },
        {
            $group: {
                _id: { $month: '$createdAt' },
                numProductSale: { $sum: 1 },
                totalSale: { $sum: '$total' },
            },
        },
        {
            $addFields: { month: '$_id' },
        },
        {
            $project: { _id: 0 },
        },
        {
            $sort: { month: 1 },
        },
        {
            $limit: 12,
        },
    ]);
    res.status(200).json({
        status: 'success',
        data: { plan },
    });
});

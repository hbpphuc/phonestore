const crud = require('./crudHandler');
const Review = require('../models/reviewModel');
const asyncHandler = require('express-async-handler');
const { AppError } = require('../utils');

exports.getAllReview = crud.getAll(Review);

exports.setProductUserId = (req, res, next) => {
    // Allow nested routes
    if (!req.body.product) req.body.product = req.params.prodId;
    if (!req.body.user) req.body.user = req.user.id;

    next();
};

exports.getReview = crud.getOne(Review);
exports.createReview = crud.createOne(Review);
exports.updateReview = crud.updateOne(Review);
exports.deleteReview = crud.deleteOne(Review);

exports.createReplyReview = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    req.body.user = req.user.id;

    const review = await Review.findByIdAndUpdate(
        id,
        {
            $push: { reply: req.body },
        },
        { new: true }
    );

    if (!review) {
        return next(new AppError('This review does not exist.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            review,
        },
    });
});

exports.editReplyReview = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    req.body.user = req.user.id;

    const review = await Review.findByIdAndUpdate(
        id,
        {
            reply: req.body,
        },
        { new: true }
    );

    if (!review) {
        return next(new AppError('This review does not exist.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            review,
        },
    });
});

exports.deleteReplyReview = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
        return next(new AppError('This review does not exist.', 404));
    }

    let result;

    if (
        review.reply.map((item) => item._id).includes(req.body.repId) &&
        review.reply.map((item) => item.user).includes(req.user.id)
    ) {
        result = await Review.findByIdAndUpdate(
            id,
            {
                $pull: { reply: req.body },
            },
            { new: true }
        );
    }

    res.status(200).json({
        status: 'success',
        data: {
            result,
        },
    });
});

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, 'Review can not be empty.'],
        },
        rating: {
            type: Number,
            default: 5,
            min: 1,
            max: 5,
        },
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Review must belong to a product.'],
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Review must write by a user.'],
        },
        reply: [
            {
                content: {
                    type: String,
                    required: [true, 'Reply can not be empty.'],
                },
                user: {
                    type: mongoose.Types.ObjectId,
                    ref: 'User',
                    required: [true, 'Reply must write by a user.'],
                },
                createdAt: {
                    type: Date,
                    default: Date.now(),
                },
            },
        ],
    },
    { timestamps: true }
);

reviewSchema.index({ product: 1, user: 1 });

reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user reply.user',
        select: 'name photo',
    });
    next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

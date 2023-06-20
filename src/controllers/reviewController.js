const crud = require('./crudHandler');
const Review = require('../models/reviewModel');

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

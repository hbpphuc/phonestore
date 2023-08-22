const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.route('/').get(reviewController.getAllReview);

router.route('/:id').get(reviewController.getReview);

router.use(authController.protect);

router
    .route('/')
    .post(reviewController.setProductUserId, reviewController.createReview);

router
    .route('/:id')
    .patch(reviewController.setProductUserId, reviewController.updateReview)
    .delete(reviewController.setProductUserId, reviewController.deleteReview);

module.exports = router;

const express = require('express');
const couponController = require('../controllers/couponController');

const router = express.Router();

router
    .route('/')
    .get(couponController.getAllCoupon)
    .post(couponController.createCoupon);

router
    .route('/:id')
    .get(couponController.getCoupon)
    .put(couponController.updateCoupon)
    .delete(couponController.deleteCoupon);

module.exports = router;

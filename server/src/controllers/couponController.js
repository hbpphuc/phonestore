const Coupon = require('../models/couponModel');
const crud = require('./crudHandler');

exports.getAllCoupon = crud.getAll(Coupon);
exports.createCoupon = crud.createOne(Coupon);
exports.getCoupon = crud.getOne(Coupon);
exports.updateCoupon = crud.updateOne(Coupon);
exports.deleteCoupon = crud.deleteOne(Coupon);

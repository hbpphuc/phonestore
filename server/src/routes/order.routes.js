const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.route('/userOrder').get(orderController.getUserOrder);

router.route('/').post(orderController.createOrder);
router.route('/:id').get(orderController.getOrder);

router.use(authController.restrictTo('admin'));

router.route('/').get(orderController.getAllOrder);

router
    .route('/:id')
    .put(orderController.updateOrder)
    .delete(orderController.deleteOrder);

module.exports = router;

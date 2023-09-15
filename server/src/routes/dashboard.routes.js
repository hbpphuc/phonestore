const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('admin'));

router.route('/stats').get(dashboardController.getStats);
router.route('/orderStats').get(dashboardController.getOrderStats);
router.route('/monthlyPlan').get(dashboardController.getMonthlyPlan);

module.exports = router;

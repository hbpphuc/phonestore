const express = require('express');
const dashboardController = require('../controllers/dashboardController');

const router = express.Router();

router.route('/stats').get(dashboardController.getStats);
router.route('/orderStats').get(dashboardController.getOrderStats);
router.route('/monthlyPlan/:year').get(dashboardController.getMonthlyPlan);

module.exports = router;

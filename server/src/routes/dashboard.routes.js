const express = require('express');
const dashboardController = require('../controllers/dashboardController');

const router = express.Router();

router.route('/productStat').get(dashboardController.getProductStats);
router.route('/userStat').get(dashboardController.getUserStats);
router.route('/orderStat').get(dashboardController.getOrderStats);
router.route('/monthlyPlan/:year').get(dashboardController.getMonthlyPlan);

module.exports = router;

const express = require('express');
const brandController = require('../controllers/brandController');

const router = express.Router();

router.route('/findMany').get(brandController.findManyBrand);

router
    .route('/')
    .get(brandController.getAllBrand)
    .post(brandController.createBrand);

router
    .route('/:id')
    .get(brandController.getBrand)
    .put(brandController.updateBrand)
    .delete(brandController.deleteBrand);

module.exports = router;

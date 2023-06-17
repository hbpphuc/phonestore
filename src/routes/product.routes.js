const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/search').get(productController.searchProduct);

router
    .route('/')
    .get(productController.getAllProduct)
    .post(
        authController.protect,
        authController.restrict('admin'),
        productController.createProduct
    );

router
    .route('/:id')
    .get(productController.getProduct)
    .put(
        authController.protect,
        authController.restrict('admin'),
        productController.updateProduct
    )
    .delete(
        authController.protect,
        authController.restrict('admin'),
        productController.deleteProduct
    );

module.exports = router;

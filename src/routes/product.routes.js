const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const reviewRouter = require('../routes/review.routes');

const router = express.Router();

router.use('/:prodId/reviews', reviewRouter);

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

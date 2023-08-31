const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const reviewRouter = require('../routes/review.routes');

const router = express.Router();

router.use('/:prodId/reviews', reviewRouter);

router
    .route('/getProductOnCategory/:type')
    .get(productController.getProductOnCategory);

router
    .route('/uploads/:id')
    .put(
        authController.protect,
        authController.restrictTo('admin'),
        productController.populatedImages,
        productController.uploadProductImages
    );

router.route('/search').get(productController.searchProduct);
router.route('/:slug').get(productController.getProductSlug);

router
    .route('/')
    .get(productController.getAllProduct)
    .post(
        authController.protect,
        authController.restrictTo('admin'),
        productController.populatedImages,
        productController.createProduct
    );

router
    .route('/:id')
    .get(productController.getProduct)
    .put(
        authController.protect,
        authController.restrictTo('admin'),
        productController.uploadProductImages,
        productController.updateProduct
    )
    .delete(
        authController.protect,
        authController.restrictTo('admin'),
        productController.deleteProduct
    );

module.exports = router;

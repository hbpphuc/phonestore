const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const reviewRouter = require('../routes/review.routes');

const router = express.Router();

router.use('/:prodId/reviews', reviewRouter);

router
    .route('/uploads/:id')
    .put(
        productController.populatedImages,
        productController.uploadProductImages
    );

router.route('/search').get(productController.searchProduct);
router.route('/:slug').get(productController.getProductSlug);

router
    .route('/')
    .get(productController.getAllProduct)
    .post(productController.createProduct);

router
    .route('/:id')
    .get(productController.getProduct)
    .get(productController.getProductSlug)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct);

module.exports = router;

const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(postController.getAllPost);
router.route('/:slug').get(postController.getPostSlug);

router.use(authController.protect);

router.route('/:id/like').put(postController.like);
router.route('/:id/dislike').put(postController.dislike);

router.use(authController.restrictTo('admin'));

router
    .route('/uploads/:id')
    .put(postController.populatedImages, postController.uploadPostImages);

router
    .route('/')
    .post(postController.populatedImages, postController.createPost);

router
    .route('/:id')
    .put(postController.uploadPostImages, postController.updatePost)
    .delete(postController.deletePost);

module.exports = router;

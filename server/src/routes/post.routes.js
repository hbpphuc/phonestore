const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .route('/uploads/:id')
    .put(postController.populatedImages, postController.uploadPostImages);

router
    .route('/')
    .get(postController.getAllPost)
    .post(postController.createPost);

router
    .route('/:id')
    .get(postController.getPost)
    .put(postController.updatePost)
    .delete(postController.deletePost);

router.route('/:id/liking').put(authController.protect, postController.liking);
router
    .route('/:id/disliking')
    .put(authController.protect, postController.disliking);

module.exports = router;
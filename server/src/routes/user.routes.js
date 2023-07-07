const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/signup').post(authController.registerMail);
router.route('/signup/:token').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').put(authController.resetPassword);

router.use(authController.protect);

router.route('/me').get(userController.getMe, userController.getUser);
router
    .route('/updateMe')
    .put(userController.populatedImages, userController.updateMe);

router.route('/deleteMe', userController.deleteMe);
router.route('/updatePassword').put(authController.updatePassword);
router.route('/updateCart').put(userController.updateCart);

router.use(authController.restrictTo('manager', 'admin'));

router.route('/').get(userController.getAllUser);
router
    .route('/:id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;

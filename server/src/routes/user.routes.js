const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/sendRequest').post(authController.requestSignup);
router.route('/signup/:token').get(authController.signup);
router.route('/login').post(authController.login);

router.route('/login/google').get(passport.authenticate('google'));
router
    .route('/login/google/redirect')
    .get(passport.authenticate('google'), authController.redirectGG);

router.route('/logout').get(authController.logout);

router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').put(authController.resetPassword);

router.route('/refreshToken').get(authController.refreshToken);

router.use(authController.protect);

router.route('/me').get(userController.getMe, userController.getCurrent);
router.route('/updateMe').put(userController.updateMe);
router
    .route('/updateAvatar')
    .put(userController.populatedImages, userController.updateAvatar);
router.route('/deleteMe', userController.deleteMe);
router.route('/updatePassword').put(authController.updatePassword);
router.route('/updateCart').put(userController.updateCart);
router.route('/addToWishlist').put(userController.addToWishlist);
router.route('/getUserWishlist').get(userController.getUserWishlist);

router.use(authController.restrictTo('manager', 'admin'));

router.route('/').get(userController.getAllUser);
router
    .route('/:id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;

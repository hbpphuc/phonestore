const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);

router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').put(authController.resetPassword);

router.use(authController.protect);

router.route('/me', userController.getMe);
router.route('/updateMe', userController.updateMe);
router.route('/deleteMe', userController.deleteMe);

router.route('/updatePassword').put(authController.updatePassword);

router.use(authController.restrict('admin'))

router.route('/').get(userController.getAllUser);

router
    .route('/:id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
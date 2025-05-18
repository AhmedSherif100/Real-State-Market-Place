// 3rd Party Modules
const express = require('express');

// Internal Modules
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth/authMiddleware');

const router = express.Router();

// Public Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forget-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

// Protected Routes
router.use(authMiddleware.protect);
router.get('/me', authController.getMe);
router.patch('/updateMe', authController.updateMe);

module.exports = router;

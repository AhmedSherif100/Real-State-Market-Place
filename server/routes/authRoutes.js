// 3rd Party Modules
const express = require('express');

// Internal Modules
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth/authMiddleware');
const { protect } = require('../middlewares/auth/authMiddleware');

const router = express.Router();

// Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authMiddleware.protect, authController.getMe);
router.post('/logout', authController.logout);
router.post('/forget-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.get('/me', protect, authController.getMe);
router.patch('/updateMe', protect, authController.updateMe);

module.exports = router;

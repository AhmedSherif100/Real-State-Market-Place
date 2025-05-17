// 3rd Party Modules
const express = require('express');

// Internal Modules
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/auth/authMiddleware');

const router = express.Router();

// Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authMiddleware.protect, authController.getMe);
router.patch('/updateMe', authMiddleware.protect, authController.updateMe);
router.post('/logout', authController.logout);
router.post('/forget-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.get('/me', protect, authController.getMe);

module.exports = router;

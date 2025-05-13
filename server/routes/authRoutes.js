// 3rd Party Modules
const express = require('express');

// Internal Modules
const authController = require('../controllers/authController');

const router = express.Router();

// Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

module.exports = router;

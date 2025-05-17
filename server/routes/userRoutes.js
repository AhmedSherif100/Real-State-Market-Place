const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth/authMiddleware');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const userController = require('../controllers/userController');

router.use(authMiddleware.protect);

// Get current user
router.get('/me', userController.getMe);

// Get user by ID
router.get('/:id', userController.getUserByID);

module.exports = router;

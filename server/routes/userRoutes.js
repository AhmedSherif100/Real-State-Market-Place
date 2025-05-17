const express = require('express');
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/auth/authMiddleware');

const router = express.Router();

// Protected routes
router.use(protect);

// Get user by email
router.get('/email/:email', userController.getUserByEmail);

module.exports = router; 
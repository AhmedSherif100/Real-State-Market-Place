const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/auth/authMiddleware');

// Public routes
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);

// Protected routes
router.use(authMiddleware.protect);
router.post('/', reviewController.createReview);
router.patch('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router; 
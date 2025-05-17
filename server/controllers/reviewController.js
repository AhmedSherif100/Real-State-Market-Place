const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

exports.createReview = catchAsync(async (req, res) => {
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

exports.getAllReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find().populate('agent', 'firstName lastName');
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.getReviewById = catchAsync(async (req, res) => {
  const review = await Review.findById(req.params.id).populate('agent', 'firstName lastName');
  
  if (!review) {
    return res.status(404).json({
      status: 'fail',
      message: `No review found with ID: ${req.params.id}`,
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

exports.updateReview = catchAsync(async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('agent', 'firstName lastName');

  if (!review) {
    return res.status(404).json({
      status: 'fail',
      message: `No review found with ID: ${req.params.id}`,
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) {
    return res.status(404).json({
      status: 'fail',
      message: `No review found with ID: ${req.params.id}`,
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
}); 
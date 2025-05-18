const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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
  const reviews = await Review.find()
    .populate({
      path: 'agent',
      select: 'firstName lastName',
      options: { lean: true },
    })
    .sort({ createdAt: -1 }); // Sort by newest first

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.getRandomReviews = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit) || 3;
  const reviews = await Review.aggregate([
    { $sample: { size: limit } },
    {
      $lookup: {
        from: 'agents',
        localField: 'agent',
        foreignField: '_id',
        as: 'agentDetails',
      },
    },
    {
      $unwind: '$agentDetails',
    },
    {
      $project: {
        _id: 1,
        reviewerName: 1,
        rating: 1,
        reviewText: 1,
        date: 1,
        agent: {
          firstName: '$agentDetails.firstName',
          lastName: '$agentDetails.lastName',
        },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.getReviewById = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate(
    'agent',
    'firstName lastName'
  );

  if (!review) {
    return next(new AppError(`No review found with ID: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  // Validate required fields for admin update
  const { rating, reviewText } = req.body;

  if (!rating || !reviewText) {
    return next(
      new AppError(
        'Please provide all required fields: rating and reviewText',
        400
      )
    );
  }

  // Validate rating range
  if (rating < 1 || rating > 5) {
    return next(new AppError('Rating must be between 1 and 5', 400));
  }

  const review = await Review.findByIdAndUpdate(
    req.params.id,
    { rating, reviewText, updatedAt: Date.now() },
    {
      new: true,
      runValidators: true,
    }
  ).populate('agent', 'firstName lastName');

  if (!review) {
    return next(new AppError(`No review found with ID: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError(`No review found with ID: ${req.params.id}`, 404));
  }

  await Review.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

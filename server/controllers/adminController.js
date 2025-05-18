const User = require('../models/userModel.js');
const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError.js');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  // Remove any filters to show all users, including inactive ones
  const users = await User.find().select('-password');

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id).select('-password');

  if (!user) {
    return next(new AppError(`No user found with ID: ${id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Prevent password updates through this route
  if (req.body.password) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updatePassword',
        400
      )
    );
  }

  // Find user first to check if it exists
  const existingUser = await User.findById(id);
  if (!existingUser) {
    return next(new AppError(`No user found with ID: ${id}`, 404));
  }

  // Update user with new data
  const user = await User.findByIdAndUpdate(
    id,
    { ...req.body },
    {
      new: true,
      runValidators: true,
    }
  ).select('-password');

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deactivateUser = catchAsync(async (req, res, next) => {
  if (req.params.id == req.user._id)
    return next(new AppError("You can't deactivate your own account!", 400));

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { active: false },
    { new: true }
  );

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'User has been deactivated successfully',
    data: { user },
  });
});

exports.reactivateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // First find the user to check if they exist
  const user = await User.findById(id);
  if (!user) {
    return next(new AppError(`No user found with ID: ${id}`, 404));
  }

  // Update the user's active status
  user.active = true;
  await user.save();

  res.status(200).json({
    status: 'success',
    data: {
      user: user,
    },
  });
});

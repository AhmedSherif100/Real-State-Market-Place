const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

module.exports.getMe = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError('No user found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

module.exports.getUserByID = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

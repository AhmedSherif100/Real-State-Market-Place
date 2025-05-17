const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getUserByEmail = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.params.email });

  if (!user) {
    return next(new AppError('No user found with that email', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
}); 
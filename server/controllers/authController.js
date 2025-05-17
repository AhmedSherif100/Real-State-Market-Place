// Core Modules //
const crypto = require('crypto');
const { promisify } = require('util');

// 3rd Party Modules //
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Internal Modules //
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

const createJWTToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60,
  });
};

module.exports.register = catchAsync(async (req, res, next) => {
  try {
    // Add instance of a new user to database
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    // Create a JWT token
    const token = createJWTToken(newUser);

    // Remove password from output
    newUser.password = undefined;

    res.status(201).json({
      status: 'success',
      message: 'User created successfully!',
      data: {
        user: newUser,
        token,
      },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new AppError(error.message, 400));
    }
    next(error);
  }
});

module.exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user provided email and password
  if (!email || !password)
    return next(new AppError('Please provide email and password!', 400));

  // Check if user exists
  const user = await User.findOne({ email }).select('+password +active');
  if (!user || !(await user.isCorrectPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password!', 401));
  }

  // Check if password is correct
  const isPasswordCorrect = await user.isCorrectPassword(
    password,
    user.password
  );
  if (!isPasswordCorrect) {
    return next(new AppError('Incorrect email or password!', 401));
  }

  // Check if the user's account is active
  if (!user.active)
    return next(
      new AppError('Your account is deactivated. Please contact support.', 401)
    );

  // Create JWT token
  const token = createJWTToken(user);

  // Remove password from output
  user.password = undefined;
  res.status(200).json({
    status: 'success',
    message: 'Logged in successfully!',
    data: {
      user,
      token,
    },
  });
});

module.exports.logout = catchAsync(async (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully!',
  });
});

module.exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Get user based on provided email address
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new AppError('There is no user with that email address!', 404));

  // If a user exists with provided email address, generate a reset-password token.
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Send the token to the user's email
  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/auth/reset-password/${resetToken}`;
    const newEmail = new Email(user, resetURL);
    await newEmail.sendPasswordReset();

    // Respond to the frontend with success
    res.status(200).json({
      status: 'success',
      data: {
        message:
          'A password reset link has been successfully sent to your email. Please check your inbox and follow the instructions to reset your password.',
      },
    });
  } catch (err) {
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        'There was an error sending the email. Please try again later!',
        500
      )
    );
  }
});

module.exports.resetPassword = catchAsync(async (req, res, next) => {
  // Get user based on the hashed token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordTokenExpiry: { $gt: Date.now() },
  }).select('+password');

  if (!user)
    return next(
      new AppError('Reset Password Token is invalid or has expired!', 401)
    );

  if (!req.body.password || !req.body.confirmPassword)
    return next(new AppError('Fill required fields!', 400));

  if (req.body.password != req.body.confirmPassword)
    return next(new AppError('Passwords do not match!', 400));

  console.log('Fetched user email:', user.email);
  console.log('Old password hash:', user.password);
  console.log('New password:', req.body.password);
  if (await bcrypt.compare(req.body.password, user.password))
    return next(
      new AppError("New password can't be same as old password!", 400)
    );

  // If token and user are valid, change password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpiry = undefined;

  // Trigger document middleware to change user.passwordChangedAt property
  await user.save();

  // Login the user
  const jwt = createJWTToken(user);

  res.status(201).json({
    status: 'success',
    data: {
      token: jwt,
    },
  });
});

module.exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = User.findById(req.user.id).select('+password');

  if (!(await bcrypt.compare(req.body.currentPassword, user.password)))
    return next(new AppError('Your current password is wrong!', 401));

  user.password = req.body.currentPassword;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  const token = createJWTToken(user);

  // Respond with success to the frontend
  res.status(200).json({
    status: 'successs',
    data: {
      message: 'Password updated successfully!',
    },
  });
});

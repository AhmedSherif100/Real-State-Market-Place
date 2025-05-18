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

const sendJWTToken = (user, statusCode, res) => {
  const token = createJWTToken(user);

  // Set JWT cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000, // Convert days to milliseconds
    path: '/',
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    data: {
      user,
    },
  });
};

module.exports.register = catchAsync(async (req, res, next) => {
  try {
    console.log('Registration request body:', req.body);

    // Add instance of a new user to database
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    console.log('Created user:', newUser);
    sendJWTToken(newUser, 201, res);
  } catch (error) {
    console.error('Registration error:', error);
    if (error.name === 'ValidationError') {
      return next(new AppError(error.message, 400));
    }
    next(error);
  }
});

module.exports.login = catchAsync(async (req, res, next) => {
  console.log('Login attempt with body:', { email: req.body.email });

  const { email, password } = req.body;

  // Check if user provided email and password
  if (!email || !password) {
    console.log('Missing email or password');
    return next(new AppError('Please provide email and password!', 400));
  }

  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password +active');
  if (!user) {
    console.log('User not found:', email);
    return next(new AppError('Incorrect email or password!', 401));
  }

  // Check if password is correct
  const isPasswordCorrect = await user.isCorrectPassword(
    password,
    user.password
  );
  if (!isPasswordCorrect) {
    console.log('Incorrect password for user:', email);
    return next(new AppError('Incorrect email or password!', 401));
  }

  // Check if the user's account is active
  if (!user.active) {
    console.log('Inactive account:', email);
    return next(
      new AppError('Your account is deactivated. Please contact support.', 401)
    );
  }

  console.log('Login successful for user:', email);
  sendJWTToken(user, 200, res);
});

module.exports.logout = catchAsync(async (req, res) => {
  res.cookie('jwt', 'loggedout', {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 1000),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    domain:
      process.env.NODE_ENV === 'production'
        ? process.env.COOKIE_DOMAIN
        : 'localhost',
  });

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

module.exports.getMe = catchAsync(async (req, res, next) => {
  // req.user is set by the protect middleware
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

module.exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.role || req.body.authType) {
    return next(
      new AppError('Cannot update password, role, or authType here', 400)
    );
  }

  // 2. Filter allowed fields to update
  const allowedFields = [
    'firstName',
    'lastName',
    'email',
    'profilePicture',
    'phoneNumber',
    'whatsapp',
    'contactEmail',
  ];
  const updates = {};
  allowedFields.forEach((field) => {
    if (req.body[field]) updates[field] = req.body[field];
  });

  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (!updates.email) {
    return next(new AppError('Invalid email address', 400));
  }

  Object.keys(updates).forEach((key) => {
    user[key] = updates[key];
  });

  const updatedUser = await user.save({ validateBeforeSave: true });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

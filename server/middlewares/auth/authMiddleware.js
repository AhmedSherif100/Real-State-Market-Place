// Core Modules
const crypto = require('crypto');
const { promisify } = require('util');

// 3rd Party Modules
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Internal Modules
const User = require('../../models/userModel');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const config = require('../../config');

module.exports.protect = catchAsync(async (req, res, next) => {
  // Debug cookies
  console.log('Cookies:', req.cookies);
  console.log('Headers:', req.headers);

  // Checking if the token exists
  let token;
  if (req.cookies?.jwt) {
    token = req.cookies.jwt;
    console.log('Token from cookie:', token);
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    console.log('Token from header:', token);
  }

  if (!token || token === 'loggedout') {
    console.log('No token found or token is loggedout');
    return next(
      new AppError('You are not logged in! Please login to gain access.', 401)
    );
  }

  try {
    // Verifying token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    // Checking if the user still exists
    const user = await User.findById(decoded.id).select('+active');
    if (!user) {
      console.log('User not found for ID:', decoded.id);
      return next(new AppError('This user no longer exists.', 401));
    }

    // Checking if the user's account is active
    if (!user.active) {
      console.log('User account is inactive:', decoded.id);
      return next(
        new AppError(
          'Your account is deactivated! For more information, please contact support.',
          401
        )
      );
    }

    // Checking if the user changed password after the token was issued
    if (user.changedPasswordAfter(decoded.iat)) {
      console.log('User changed password after token was issued:', decoded.id);
      return next(
        new AppError('User recently changed password! Please login again.', 401)
      );
    }

    // Grant access to protected route
    req.user = user;
    next();
  } catch (error) {
    console.log('Token verification error:', error.message);
    return next(new AppError('Invalid token. Please login again.', 401));
  }
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

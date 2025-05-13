const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config');

const { model, Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      first: { type: String },
      last: { type: String },
    },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: function () {
        return this.authType === 'local';
      },
    },
    authType: { type: String, default: 'local' },

    profilePicture: { type: String, default: '' },
    role: {
      type: String,
      enum: ['buyer', 'seller', 'agent', 'admin'],
      default: `buyer`,
    },
    phoneNumber: { type: String },
    whatsapp: { type: String },
    contactEmail: { type: String },
    active: { type: Boolean, default: true },
    savedProperties: { type: Array, default: [] },
    resetPasswordToken: { type: String },
    resetPasswordTokenExpiry: { type: Date },
  },
  { timestamps: true }
);

// Middlewares
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Custom Methods
userSchema.methods.isCorrectPassword = async function (
  candidatePassword,
  hashedPassword
) {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordTokenExpiry = Date.now() + config.PASSWORD_RESET_EXPIRES_IN;
  return resetToken;
};

userSchema.methods.changedPasswordAfter = function (timestamp) {
  if (!this.passwordChangedAt) return false;
  return timestamp >= parseInt(this.passwordChangedAt.getTime() / 1000, 10);
};

const User = model('User', userSchema);

module.exports = User;

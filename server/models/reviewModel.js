const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  agent: { type: Schema.Types.ObjectId, ref: 'Agent', required: true },
  reviewerName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const Review = model('Review', reviewSchema);

module.exports = Review;

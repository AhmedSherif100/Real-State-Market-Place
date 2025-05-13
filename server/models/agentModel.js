const mongoose = require('mongoose');
const userSchema = require('./userModel');

const { Schema } = mongoose;

// Agent-specific schema additions
const agentSchema = new Schema({
  licenseNumber: { type: String },
  yearsOfExperience: { type: Number },
  languagesSpoken: [{ type: String }],
  totalSales: { type: Number },
  minPrice: { type: Number },
  maxPrice: { type: Number },
  averagePrice: { type: Number },
  about: { type: String },
  brokerage: {
    name: { type: String },
    logo: { type: String },
    website: { type: String }
  },
  ratings: {
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 }
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  activeListings: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
  website: { type: String }
}, { timestamps: true });

const Agent = userSchema.discriminator('Agent', agentSchema);

module.exports = Agent;

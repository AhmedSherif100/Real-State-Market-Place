const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const propertySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    listingType: { enum: ['sale', 'rent'], type: String, required: true },
    propertyType: {
      enum: ['residential', 'commercial'],
      type: String,
      required: true,
    },
    subType: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
    area: {
      sqft: { type: Number, required: true },
      sqm: { type: Number, required: true },
    },
    price: { type: Number, required: true },
    media: { type: Array, required: true },
    buildDate: { type: Date, required: true },
    user: { type: String, required: true },
    status: { enum: ['active', 'sold'], type: String, required: true },
    features: {
      bedrooms: { type: Number, required: true },
      bathrooms: { type: Number, required: true },
      garage: { type: Number, required: true },
      pool: { type: Boolean, required: true },
      yard: { type: Boolean, required: true },
      pets: { type: Boolean, required: true },
      furnished: {
        enum: ['fully', 'partly', 'none'],
        type: String,
        required: true,
      },
      airConditioning: { type: Boolean, required: true },
      internet: { type: Boolean, required: true },
      electricity: { type: Boolean, required: true },
      water: { type: Boolean, required: true },
      gas: { type: Boolean, required: true },
      wifi: { type: Boolean, required: true },
      security: { type: Boolean, required: true },
    },
  },
  { timestamps: true }
);

const Property = model('Property', propertySchema);

module.exports = Property;

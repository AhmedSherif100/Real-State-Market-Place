const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const PropertySubType = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    propertyType: { type: String, required: true },
}, {timestamps: true});

const propertySubTypeModel = model('PropertySubType', PropertySubType);
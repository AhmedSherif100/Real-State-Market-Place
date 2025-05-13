const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const userSchema = new Schema({
    name: { 
        first : { type: String },
        last : { type: String },    
    },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: function() { return this.authType === 'local'; }
    },
    authType: { type: String, default: 'local'},
    
    profilePicture: { type: String, default: ''},
    role: { type: String, enum: ['buyer', 'seller', 'agent', 'admin'], default: `buyer` },
    phoneNumber: { type: String },
    whatsapp: { type: String },
    contactEmail: { type: String },
    active: { type: Boolean, default: false },
    savedProperties: { type: Array, default: [] },
    resetPasswordToken: { type: String },
    resetPasswordTokenExpiry: { type: Date },
}, {timestamps: true});

const User = model('User', userSchema);

module.exports = User;
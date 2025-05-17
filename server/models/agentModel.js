const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const bcrypt = require('bcrypt');

const agentSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactEmail: { type: String },
    phoneNumber: { type: String, required: true },
    totalSales: { type: Number, default: 0 },
    yearsOfExperience: { type: Number, required: true },
    age: { type: Number, required: true },
    about: { type: String },
    user: { type: String }, 
    status: { enum: ['active', 'inactive'], type: String, default: 'active' }
  },
  { timestamps: true }
);

agentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

agentSchema.methods.isCorrectPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Agent = model('Agent', agentSchema);

module.exports = Agent;

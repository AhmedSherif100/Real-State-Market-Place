const mongoose = require('mongoose');
const { model, Schema } = mongoose

const transactionSchema = new Schema({
    user: { type: String, required: true },
    property: { type: String, required: true },

}, {timestamps: true});

const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;
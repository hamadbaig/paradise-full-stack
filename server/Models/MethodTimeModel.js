const mongoose = require('mongoose');

const MethodTimeSchema = new mongoose.Schema({
  Time: { type: String, required: true },
  ShippingMethod: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

module.exports = mongoose.model('MethodTime', MethodTimeSchema);
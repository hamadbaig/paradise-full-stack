const mongoose = require('mongoose');

const ShippingMethodSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  price: { type: String, unique: true, required: true },

});

module.exports = mongoose.model('ShippingMethod', ShippingMethodSchema);

const mongoose = require('mongoose');

const AddOnSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imageUrl1: { type: String, required: true },
  imageUrl2: { type: String, required: true },
  
  
});

module.exports = mongoose.model('AddOn', AddOnSchema);

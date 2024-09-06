// const mongoose = require("mongoose");

// const addressSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   mobile: { type: String, required: true },
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   landmark: { type: String, required: true },
// });

// const cartItemSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   price: { type: String, required: true },
//   imageUrl: { type: String, required: true },
//   imageUrl1: { type: String, required: true },
//   imageUrl2: { type: String, required: true },
// });

// const methodSchema = new mongoose.Schema({
//   _id: { type: mongoose.Schema.Types.ObjectId, required: true },
//   name: { type: String, required: true },
//   price: { type: String, required: true },
// });

// const orderItemSchema = new mongoose.Schema({
//   addresses: [addressSchema],
//   cartItems: [cartItemSchema],
//   method: methodSchema,
//   city: { type: String, required: true },
//   date: { type: String, required: true },
//   time: { type: String, required: true },
// });

// const orderSchema = new mongoose.Schema({
//   Data: [orderItemSchema],
//   userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
//   totalPrice: { type: String, required: true },
// });

// module.exports = mongoose.model("Order", orderSchema);
// models/Order.js

const mongoose = require("mongoose");

// Define the Address schema
const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  landmark: { type: String, required: true },
  addressType: { type: String, default: "home" }, // Added default value for addressType
});

// Define the CartItem schema
const cartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imageUrl1: { type: String, required: false },
  imageUrl2: { type: String, required: false },
});

// Define the Method schema
const methodSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
});

// Define the OrderItem schema
const orderItemSchema = new mongoose.Schema({
  addresses: { type: [addressSchema], required: true }, // Ensure addresses array is required
  cartItems: { type: [cartItemSchema], required: true }, // Ensure cartItems array is required
  method: { type: methodSchema, required: true }, // Ensure method is required
  city: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

// Define the Order schema
const orderSchema = new mongoose.Schema({
  Data: { type: [orderItemSchema], required: true }, // Ensure Data array is required
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  totalPrice: { type: String, required: true },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

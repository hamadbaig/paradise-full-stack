// controllers/orderController.js

const Order = require("../Models/OrderModel");

exports.addOrder = async (req, res) => {
  try {
    const { Data, userId, totalPrice } = req.body;

    const mappedData = Data.map((item) => {
      return {
        addresses: item.address,
        cartItems: item.cartItem,
        method: item.method,
        city: item.city,
        date: item.date,
        time: item.time,
      };
    });

    const newOrder = new Order({
      Data: mappedData,
      userId,
      totalPrice,
    });

    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get orders by user ID
exports.getOrders = async (req, res) => {
  try {
    // Retrieve all orders
    const orders = await Order.find();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get orders",
      error: error.message,
    });
  }
};

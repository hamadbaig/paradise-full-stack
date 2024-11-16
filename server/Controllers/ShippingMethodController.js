const ShippingMethod = require("../Models/ShippingMethodModel");

exports.addShippingMethod = async (req, res) => {
  try {
    const { name, price } = req.body;
    const Shipping = await ShippingMethod.create({ name, price });
    res.status(201).json({
      message: "Shipping Method saved successfully",
      success: true,
      Shipping,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getShippingMethod = async (req, res) => {
  try {
    const Method = await ShippingMethod.find();
    res
      .status(201)
      .json({ message: "Data fetched successfully", success: true, Method });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.deleteShippingMethod = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the shipping method exists
    const shippingMethod = await ShippingMethod.findById(id);
    if (!shippingMethod) {
      return res
        .status(404)
        .json({ success: false, message: "Shipping method not found." });
    }

    // Delete the shipping method
    await ShippingMethod.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Shipping method deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting shipping method:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete shipping method.",
      error: error.message,
    });
  }
};
exports.getShippingMethodById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the shipping method by ID
    const shippingMethod = await ShippingMethod.findById(id);

    // If not found, return a 404 response
    if (!shippingMethod) {
      return res.status(404).json({
        success: false,
        message: "Shipping method not found.",
      });
    }

    // Respond with the shipping method data
    res.status(200).json({
      success: true,
      message: "Shipping method fetched successfully.",
      shippingMethod,
    });
  } catch (error) {
    console.error("Error fetching shipping method:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch shipping method.",
      error: error.message,
    });
  }
};

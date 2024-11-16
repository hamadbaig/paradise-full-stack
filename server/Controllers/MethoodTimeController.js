const MethodTime = require("../Models/MethodTimeModel");

exports.addMethodTime = async (req, res) => {
  try {
    const { Time, ShippingMethod } = req.body;

    const time = await MethodTime.create({
      Time,
      ShippingMethod,
    });
    res.status(201).json({ time });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getMethodTime = async (req, res) => {
  try {
    const { ShippingMethod } = req.body;
    if (!ShippingMethod || !Array.isArray(ShippingMethod)) {
      return res.status(400).json({
        error: "Invalid request. Please provide an array of Method id.",
      });
    }
    const time = await MethodTime.find({
      ShippingMethod: { $in: ShippingMethod },
    });
    res
      .status(200)
      .json({ message: "Data fetched successfully", success: true, time });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.deleteMethodTime = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the method time exists
    const methodTime = await MethodTime.findById(id);
    if (!methodTime) {
      return res
        .status(404)
        .json({ success: false, message: "Method time not found." });
    }

    // Delete the method time
    await MethodTime.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Method time deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting method time:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete method time.",
      error: error.message,
    });
  }
};

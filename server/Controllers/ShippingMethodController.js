const ShippingMethod = require('../Models/ShippingMethodModel');

exports.addShippingMethod = async (req, res) => {
  try {
    const { name ,price} = req.body;
    const Shipping = await ShippingMethod.create({ name, price});
    res.status(201).json({ message: "Shipping Method saved successfully", success: true, Shipping });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getShippingMethod = async (req, res) => {
  try {
    const Method = await ShippingMethod.find();
    res.status(201).json({ message: "Data fetched successfully", success: true, Method });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const AddOn = require("../Models/AddOnModel");
// const { v4: uuidv4 } = require("uuid");

exports.addAddOn = async (req, res) => {
  try {
    const { name, price, imageUrl, imageUrl1, imageUrl2 } = req.body;

    const addOn = await AddOn.create({
      name,
      price,
      imageUrl,
      imageUrl1,
      imageUrl2,
    });
    res.status(201).json({ addOn });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getAddOnById = async (req, res) => {
  try {
    // Extract add-on ID from request body
    const { addOnId } = req.body;

    // Fetch the add-on based on the provided ID
    const addOn = await AddOn.findById(addOnId);

    if (!addOn) {
      return res.status(404).json({ error: "Add-on not found" });
    }

    res.status(200).json({
      message: "Add-on data fetched successfully",
      success: true,
      addOn,
    });
  } catch (error) {
    console.error("Error fetching add-on:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getAddOn = async (req, res) => {
  try {
    const addOn = await AddOn.find();
    res
      .status(200)
      .json({ message: "Data fetched successfully", success: true, addOn });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.deleteAddOnById = async (req, res) => {
  try {
    const addOnId = req.params.id;

    const addOn = await AddOn.findById(addOnId);
    if (!addOn) {
      return res.status(404).json({ error: "Add-on not found" });
    }

    await AddOn.findByIdAndDelete(addOnId);

    res.status(200).json({
      message: "Add-on deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting add-on:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// exports.updateAddOnById = async (req, res) => {
//   try {
//     const addOnId = req.params.id;
//     const updateData = req.body;

//     const updatedAddOn = await AddOn.findByIdAndUpdate(addOnId, updateData, {
//       new: true,
//     });

//     if (!updatedAddOn) {
//       return res.status(404).json({ error: "Add-on not found" });
//     }

//     res.status(200).json({
//       message: "Add-on updated successfully",
//       success: true,
//       addOn: updatedAddOn,
//     });
//   } catch (error) {
//     console.error("Error updating add-on:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
exports.updateAddOnById = async (req, res) => {
  try {
    const addOnId = req.params.id;
    const { updateData } = req.body; // Extract the updateData object from the request body

    const updatedAddOn = await AddOn.findByIdAndUpdate(addOnId, updateData, {
      new: true,
    });

    if (!updatedAddOn) {
      return res.status(404).json({ error: "Add-on not found" });
    }

    res.status(200).json({
      message: "Add-on updated successfully",
      success: true,
      addOn: updatedAddOn,
    });
  } catch (error) {
    console.error("Error updating add-on:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

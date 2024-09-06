const SubCategory = require("../Models/SubCategoryModel");

exports.addSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    const sub = await SubCategory.create({
      name,
      category,
    });
    res.status(201).json({ sub });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getSubCatByCategories = async (req, res) => {
  try {
    const { categoryId } = req.body;
    if (!categoryId || !Array.isArray(categoryId)) {
      return res.status(400).json({
        error: "Invalid request. Please provide an array of categories.",
      });
    }
    const sub = await SubCategory.find({ category: { $in: categoryId } });
    res
      .status(200)
      .json({ message: "Data fetched successfully", success: true, sub });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

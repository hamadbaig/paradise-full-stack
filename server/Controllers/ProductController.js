const Product = require("../Models/ProductModel");
// const { v4: uuidv4 } = require("uuid");
// const AWS = require("aws-sdk");
// const { AWS_BUCKET_NAME } = process.env;

// const s3 = new AWS.S3();

exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      SubCategory,
      imageUrl,
      imageUrl1,
      imageUrl2,
    } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      category,
      SubCategory,
      imageUrl,
      imageUrl1,
      imageUrl2,
    });
    res.status(201).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    let products;

    if (query) {
      const regex = new RegExp(query, "i"); // Case-insensitive regex

      // Find products matching the search query
      const searchedProducts = await Product.find({
        $or: [{ name: regex }, { description: regex }],
      });

      // Find products that don't match the search query
      const otherProducts = await Product.find({
        $and: [
          {
            $or: [{ name: { $not: regex } }, { description: { $not: regex } }],
          },
        ],
      });

      // Combine searched products at the top and other products after
      products = [...searchedProducts, ...otherProducts];
    } else {
      // If no query is provided, return all products
      products = await Product.find({});
    }

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res
      .status(200)
      .json({ message: "Data fetched successfully", success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getProductsByCategories = async (req, res) => {
  try {
    const { categoryId } = req.body;
    if (!categoryId || !Array.isArray(categoryId)) {
      return res.status(400).json({
        error: "Invalid request. Please provide an array of categories.",
      });
    }
    const products = await Product.find({ category: { $in: categoryId } });
    res
      .status(200)
      .json({ message: "Data fetched successfully", success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    // Extract prodyct ID from request parameters or query parameters
    const { productId } = req.body;
    // Fetch products based on the filter
    const product = await Product.findById(productId);
    res
      .status(201)
      .json({ message: "Data fetched successfully", success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// exports.getProductsByCategoryAndSubCategory = async (req, res) => {
//   try {
//     const { categoryId, subCategoryId } = req.body;

//     if (!categoryId || !Array.isArray(categoryId)) {
//       return res.status(400).json({
//         error: "Invalid request. Please provide an array of categories.",
//       });
//     }

//     let query = {
//       category: { $in: categoryId },
//     };

//     // Add subCategoryId to the query if it's provided and not empty
//     if (
//       subCategoryId &&
//       Array.isArray(subCategoryId) &&
//       subCategoryId.length > 0
//     ) {
//       query.SubCategory = { $in: subCategoryId };
//     }

//     // Find products that match the query
//     const products = await Product.find(query);

//     // Respond with the products found
//     res.status(200).json({
//       message: "Data fetched successfully",
//       success: true,
//       products,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
exports.getProductsByCategoryAndSubCategory = async (req, res) => {
  try {
    const { categoryId, subCategoryId } = req.body;

    // If both categoryId and subCategoryId are missing or empty, return all products
    if (
      (!categoryId || !Array.isArray(categoryId) || categoryId.length === 0) &&
      (!subCategoryId ||
        !Array.isArray(subCategoryId) ||
        subCategoryId.length === 0)
    ) {
      const allProducts = await Product.find({});
      return res.status(200).json({
        message: "All products fetched successfully",
        success: true,
        products: allProducts,
      });
    }

    // Validate categoryId
    if (!categoryId || !Array.isArray(categoryId)) {
      return res.status(400).json({
        error: "Invalid request. Please provide an array of categories.",
      });
    }

    let query = {
      category: { $in: categoryId },
    };

    // Add subCategoryId to the query if it's provided and not empty
    if (
      subCategoryId &&
      Array.isArray(subCategoryId) &&
      subCategoryId.length > 0
    ) {
      query.SubCategory = { $in: subCategoryId };
    }

    // Find products that match the query
    const products = await Product.find(query);

    // Respond with the products found
    res.status(200).json({
      message: "Data fetched successfully",
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

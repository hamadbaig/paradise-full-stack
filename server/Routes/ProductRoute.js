const router = require("express").Router();
const {
  addProduct,
  getProducts,
  getSortedProducts,
  getProductsByCategories,
  getProductById,
  getProductsByCategoryAndSubCategory,
  searchProducts,
  deleteProductById,
  updateProductById,
} = require("../Controllers/ProductController");
const { authMiddleware } = require("../Middlewares/AuthMiddleware");
const uploadMiddleware = require("../Middlewares/UploadMiddleware");

router.post("/addProduct", addProduct);

router.get("/getProducts", getProducts);
router.get("/getSortedProducts", getSortedProducts);

router.get("/search", searchProducts);
router.post("/getProductsByCategories", getProductsByCategories);
router.post("/getProductById", getProductById);
router.post(
  "/getProductsByCategoryAndSubCategory",
  getProductsByCategoryAndSubCategory
);
router.delete("/deleteProductById/:id", deleteProductById);
router.post("/UpdateProductById/:id", updateProductById);

module.exports = router;

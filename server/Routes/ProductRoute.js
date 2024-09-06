const router = require("express").Router();
const {
  addProduct,
  getProducts,
  getProductsByCategories,
  getProductById,
  getProductsByCategoryAndSubCategory,
  searchProducts,
} = require("../Controllers/ProductController");
const { authMiddleware } = require("../Middlewares/AuthMiddleware");
const uploadMiddleware = require("../Middlewares/UploadMiddleware");

// router.post('/addProduct', authMiddleware, uploadMiddleware, addProduct);
router.post("/addProduct", addProduct);

// router.post('/upload',uploadMiddleware.array("images"), handleFileUpload);
// router.get('/getProducts', authMiddleware, getProducts);
router.get("/getProducts", getProducts);

router.get("/search", searchProducts);
router.post("/getProductsByCategories",getProductsByCategories);
router.post("/getProductById", getProductById);
router.post("/getProductsByCategoryAndSubCategory", getProductsByCategoryAndSubCategory);


module.exports = router;

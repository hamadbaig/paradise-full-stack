const router = require("express").Router();
const {
  addAddOn,
  getAddOn,
//   getProductsByCategories,
//   getProductById,
//   handleFileUpload,
//   searchProducts,
} = require("../Controllers/AddONController");
const { authMiddleware } = require("../Middlewares/AuthMiddleware");
const uploadMiddleware = require("../Middlewares/UploadMiddleware");

// router.post('/addProduct', authMiddleware, uploadMiddleware, addProduct);
router.post("/addAddOn", addAddOn);

// router.post('/upload',uploadMiddleware.array("images"), handleFileUpload);
// router.get('/getProducts', authMiddleware, getProducts);
router.get("/getAddOn", getAddOn);

// router.get("/search", searchProducts);
// router.post("/getProductsByCategories",getProductsByCategories);
// router.post("/getProductById", getProductById);

module.exports = router;

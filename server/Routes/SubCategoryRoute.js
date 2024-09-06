// const router = require("express").Router();
// const {
//   addSubCategory,
//   getSubCatByCategories,

// //   getProducts,
// //   getProductById,
// //   handleFileUpload,
// //   searchProducts,
// } = require("../Controllers/SubCategoryController");
// const { authMiddleware } = require("../Middlewares/AuthMiddleware");
// const uploadMiddleware = require("../Middlewares/UploadMiddleware");

// // router.post('/addProduct', authMiddleware, uploadMiddleware, addProduct);
// router.post("/addSubCategory", addSubCategory);
// router.post("/getSubCatByCategories",getSubCatByCategories);

// // router.post('/upload',uploadMiddleware.array("images"), handleFileUpload);
// // router.get('/getProducts', authMiddleware, getProducts);
// // router.get("/getProducts", getProducts);

// // router.get("/search", searchProducts);
// // router.post("/getProductById", getProductById);

// module.exports = router;
const router = require("express").Router();
const {
  addSubCategory,
  getSubCatByCategories,
} = require("../Controllers/SubCategoryController");

const { authMiddleware } = require("../Middlewares/AuthMiddleware");
const uploadMiddleware = require("../Middlewares/UploadMiddleware");

router.post("/addSubCategory", addSubCategory);
router.post("/getSubCatByCategories", getSubCatByCategories);

module.exports = router;
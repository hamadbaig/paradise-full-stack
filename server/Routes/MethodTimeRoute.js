const router = require("express").Router();
const {
  addMethodTime,
  getMethodTime,
  deleteMethodTime,
} = require("../Controllers/MethoodTimeController");

const { authMiddleware } = require("../Middlewares/AuthMiddleware");
const uploadMiddleware = require("../Middlewares/UploadMiddleware");

router.post("/addMethodTime", addMethodTime);
router.post("/getMethodTime", getMethodTime);
router.delete("/deleteMethodTime/:id", deleteMethodTime);
module.exports = router;

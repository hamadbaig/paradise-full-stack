const {
  addShippingMethod,
  getShippingMethod,
  deleteShippingMethod,
  getShippingMethodById,
} = require("../Controllers/ShippingMethodController");
const { authMiddleware } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/addShippingMethod", addShippingMethod);
router.get("/getShippingMethod", getShippingMethod);
router.delete("/deleteShippingMethod/:id", deleteShippingMethod);
router.get("/getShippingMethodById/:id", getShippingMethodById);
module.exports = router;

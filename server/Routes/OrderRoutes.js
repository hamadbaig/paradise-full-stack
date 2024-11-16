const router = require("express").Router();
const {
  addOrder,
  getOrders,
  getOrderById,
} = require("../Controllers/OrderController");

router.post("/addOrder", addOrder);

// Route to get orders by user ID
router.get("/getOrders", getOrders);
router.get("/getOrderById/:id", getOrderById);
module.exports = router;

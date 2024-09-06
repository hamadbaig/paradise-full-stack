const router = require("express").Router();
const { addOrder, getOrders } = require("../Controllers/OrderController");

router.post("/addOrder", addOrder);

// Route to get orders by user ID
router.get("/getOrders", getOrders);

module.exports = router;

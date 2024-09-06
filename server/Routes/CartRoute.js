const express = require("express");
const router = express.Router();
const { addToCart, viewCart } = require("../Controllers/CartContoller");
const { authMiddleware } = require("../Middlewares/AuthMiddleware");

router.post("/addToCart", addToCart);
router.get("/viewCart", viewCart);

module.exports = router;

// paymentRoutes.js
const express = require("express");
const { createPaymentIntent } = require("../Controllers/PaymentController");
const { authMiddleware } = require("../Middlewares/AuthMiddleware");

const router = express.Router();

router.post("/createPaymentIntent", createPaymentIntent);

module.exports = router;

const router = require("express").Router();

const {
  createPayment,
  capturePayment,
} = require("../Controllers/PaypalController");

router.post("/create-payment", createPayment);
router.get("/capture-payment", capturePayment);

module.exports = router;

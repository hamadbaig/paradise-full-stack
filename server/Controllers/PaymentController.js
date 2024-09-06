const stripe = require("../util/StripeConfig");

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Basic validation
    if (!amount || !currency) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"], // Ensure the correct payment method
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createPaymentIntent,
};

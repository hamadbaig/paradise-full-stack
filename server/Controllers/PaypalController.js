// controllers/paymentController.js
const paypal = require("../paypalConfig");

exports.createPayment = (req, res) => {
  const { amount, currency, customer } = req.body;

  const create_payment_json = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: amount,
        },
        payee: {
          email_address: customer.email,
        },
        description: "Order Payment",
      },
    ],
    application_context: {
      return_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/payment-cancel",
    },
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error("Error creating PayPal payment:", error);
      res.status(500).send("Error creating PayPal payment");
    } else {
      res.json({
        approval_url: payment.links.find((link) => link.rel === "approval_url")
          .href,
        payment_id: payment.id,
      });
    }
  });
};

exports.capturePayment = (req, res) => {
  const { paymentId, PayerID } = req.query;

  const execute_payment_json = {
    payer_id: PayerID,
  };

  paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
    if (error) {
      console.error("Error executing PayPal payment:", error);
      res.status(500).send("Error executing PayPal payment");
    } else {
      res.json(payment);
    }
  });
};

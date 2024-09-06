const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoute = require("./Routes/AuthRoute");
const categoryRoute = require("./Routes/CategoryRoute");
const productRoute = require("./Routes/ProductRoute");
const cartRoute = require("./Routes/CartRoute");
const paymentRoute = require("./Routes/PaymentRoute");
const addOnRoute = require("./Routes/AddOnRoute");
const subCategoryRoute = require("./Routes/SubCategoryRoute");
const ShippingMethodRoute = require("./Routes/ShippingMethodRoute");
const MethodTimeRoute = require("./Routes/MethodTimeRoute");
const OrderRoute = require("./Routes/OrderRoutes");
const paypalRoutes = require("./Routes/paypalRoutes");
const { MONGO_URL, PORT } = process.env;

const app = express();

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/public", express.static("public"));

app.use("/", authRoute);
app.use("/", categoryRoute);
app.use("/", productRoute);
app.use("/", cartRoute);
app.use("/", paymentRoute);
app.use("/", addOnRoute);
app.use("/", subCategoryRoute);
app.use("/", ShippingMethodRoute);
app.use("/", MethodTimeRoute);
app.use("/", OrderRoute);
app.use("/", paypalRoutes);

app.get("/apiconfig/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

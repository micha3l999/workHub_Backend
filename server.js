const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const router = express.Router();
const { validate, ValidationError, Joi } = require('express-validation');

//User routes
const userRoutes = require("./lib/user/userRoutes.js");
//Category routes
const categoryRoutes = require("./lib/categories/categoryRoutes.js");
//Subcategory routes
const subcategoryRoutes = require("./lib/subcategories/subcategoryRoutes.js");
//seller routes
const sellerRoutes = require("./lib/seller/sellerRoutes.js");
//Search routes
const searchRoutes = require("./lib/search/searchRoutes.js");
//Seller Services routes
const sellerServicesRoutes = require("./lib/sellerServices/sellerServicesRoutes.js");
//Hired services routes
const hiredServicesRoutes = require("./lib/hiredService/hiredServiceRoutes");
//Paypal
const paypalRoutes = require("./lib/paypal/paypalRoutes");

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

const { PORT, HOST } = require("./config/index");
require("./logger");

app.use("/", router);

app.get("/", (req, res) => {
  res.send("API is running.....");
});

app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subcategoryRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/sellerService", sellerServicesRoutes);
app.use("/api/hiredService", hiredServicesRoutes);
app.use("/api/paypal", paypalRoutes);

app.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({ error : err.details.body[0].message})
  }
  return res.status(500).json(err)
})

app.listen(PORT, function () {
  logger.info(`App listening on http://${HOST}:${PORT}`);
});

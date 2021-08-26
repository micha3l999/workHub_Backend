const express = require('express');
const paypalRoute = express.Router();
const paypalController = require("./paypalController");

const { validate, ValidationError, Joi } = require('express-validation');
const authMiddleWare = require("../middlewares/authMiddleware");

paypalRoute.get("/pay", paypalController.createPaymentPaypal);

paypalRoute.get("/success", paypalController.captureOrder);

paypalRoute.get("/authorizeOrder", paypalController.authorizeOrder);

module.exports = paypalRoute;
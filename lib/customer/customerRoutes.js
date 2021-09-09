const express = require("express");
const customerRoute = express.Router();
const customerController = require("./customerController");
const Customer = require("./customer");
const { validate, ValidationError, Joi } = require("express-validation");
const authMiddleWare = require("../middlewares/authMiddleware");


customerRoute.put("/addFavoriteServices", authMiddleWare, validate({
  body: Joi.object({
    serviceId: Joi.string().required(),
  })
}), customerController.addFavoriteServices);

customerRoute.put("/removeFavoriteServices", authMiddleWare, validate({
  body: Joi.object({
    serviceId: Joi.string().required(),
  })
}), customerController.removeFavoriteService);

module.exports = customerRoute;
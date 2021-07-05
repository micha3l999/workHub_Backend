const express = require('express');
const sellerRoute = express.Router();
const sellerController = require("./sellerController");
const Seller = require("./seller");
const { validate, ValidationError, Joi } = require('express-validation')

sellerRoute.post("/create", sellerController.createSeller);


//categoryRouter.get("/all", categoryController.allCategories);

module.exports = sellerRoute;
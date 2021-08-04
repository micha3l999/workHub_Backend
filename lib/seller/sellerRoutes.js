const express = require('express');
const sellerRoute = express.Router();
const sellerController = require("./sellerController");
const Seller = require("./seller");
const { validate, ValidationError, Joi } = require('express-validation')

sellerRoute.post("/create", validate({
    body: Joi.object({
        description: Joi.string().required(),
        skills: Joi.array().items(Joi.string()).optional(),
        professions: Joi.array().items(Joi.object()).required(),
        userID: Joi.string().required()
    })
}), sellerController.createSeller);

sellerRoute.put("/switchStatusSeller", sellerController.switchStatusSeller);

sellerRoute.get("/getSellerById", sellerController.getSellerById);

module.exports = sellerRoute;
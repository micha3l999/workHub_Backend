const express = require('express');
const sellerServiceRoute = express.Router();
const sellerServiceController = require("./sellerServicesController");
const SellerService = require("./sellerService");
const { validate, ValidationError, Joi } = require('express-validation')

sellerServiceRoute.post("/createSellerService", validate({
    body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        images: Joi.array().items(Joi.string()).required(),
        price: Joi.string().required(),
        duration: Joi.string().required(),
        categoryId: Joi.string().required(),
        subcategoryId: Joi.string().required(),
        sellerId: Joi.string().required(),
    })
}), sellerServiceController.createSellerService);

sellerServiceRoute.get("/allSellerService", sellerServiceController.allSellerService);


module.exports = sellerServiceRoute;
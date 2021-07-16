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
        price: Joi.number().required(),
        duration: Joi.number().required(),
        categoryId: Joi.string().required(),
        subcategoryId: Joi.string().required(),
        sellerId: Joi.string().required(),
        mainImage: Joi.string().required(),
    })
}), sellerServiceController.createSellerService);

sellerServiceRoute.get("/allSellerService", sellerServiceController.allSellerService);

sellerServiceRoute.get("/preCreateSellerService", sellerServiceController.preCreateSellerService);


module.exports = sellerServiceRoute;
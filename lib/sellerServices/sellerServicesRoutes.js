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
        sellerUser: Joi.string().required(),
        mainImage: Joi.string().required(),
    })
}), sellerServiceController.createSellerService);

sellerServiceRoute.put("/updateSellerService", validate({
    body: Joi.object({
        sellerService: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            duration: Joi.number().required(),
        }).required(),
        sellerServiceId: Joi.string().required(),
    })
}), sellerServiceController.updateSellerService);

sellerServiceRoute.put("/deleteSellerService", validate({
    body: Joi.object({
        sellerServiceId: Joi.string().required(),
    })
}), sellerServiceController.deleteSellerService);

sellerServiceRoute.get("/allSellerService", sellerServiceController.allSellerService);

sellerServiceRoute.get("/preCreateSellerService", sellerServiceController.preCreateSellerService);

sellerServiceRoute.get("/getServicesBySubcategory", sellerServiceController.getServicesBySubcategory);

sellerServiceRoute.get("/servicesForCustomer", sellerServiceController.servicesForCustomer);

sellerServiceRoute.get("/getSellerServiceById", sellerServiceController.getSellerServiceById);

sellerServiceRoute.get("/preCheckoutInformation", sellerServiceController.preCheckoutInformation);

sellerServiceRoute.get("/getSellerServicesBySellerUser", sellerServiceController.getServicesBySellerUser);

module.exports = sellerServiceRoute;
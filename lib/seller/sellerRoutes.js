const express = require('express');
const sellerRoute = express.Router();
const sellerController = require("./sellerController");
const Seller = require("./seller");
const { validate, ValidationError, Joi } = require('express-validation');
const authMiddleWare = require("../middlewares/authMiddleware");


sellerRoute.post("/create", validate({
    body: Joi.object({
        description: Joi.string().required(),
        skills: Joi.array().items(Joi.string()).optional(),
        professions: Joi.array().items(Joi.object()).required(),
        userID: Joi.string().required()
    })
}), sellerController.createSeller);

sellerRoute.put("/deleteSellerAccount", validate({
    body: Joi.object({
        sellerUser: Joi.string().required(),
        sellerId: Joi.string().required(),
    })
}), sellerController.deleteSellerAccount);

sellerRoute.put("/switchStatusSeller", sellerController.switchStatusSeller);

sellerRoute.get("/getSellerById", sellerController.getSellerById);

sellerRoute.get("/getActiveServicesForSeller", authMiddleWare , sellerController.getActiveServicesForSeller);


module.exports = sellerRoute;
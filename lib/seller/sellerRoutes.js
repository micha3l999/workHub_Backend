const express = require('express');
const sellerRoute = express.Router();
const sellerController = require("./sellerController");
const Seller = require("./seller");
const { validate, ValidationError, Joi } = require('express-validation')

sellerRoute.post("/create", validate({
    body: Joi.object({
        professions: Joi.array().items(Joi.object()).required(),
        description: Joi.string().required(),
        skills: Joi.array().items(Joi.string()).required(),
        userID: Joi.string().required()
    })
}), sellerController.createSeller);


//categoryRouter.get("/all", categoryController.allCategories);

module.exports = sellerRoute;
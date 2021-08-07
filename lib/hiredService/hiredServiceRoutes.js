const express = require('express');
const hiredServiceRouter = express.Router();
const hiredServiceController = require("./hiredServiceController");
const HiredService = require("./hiredService");
const { validate, ValidationError, Joi } = require('express-validation')

hiredServiceRouter.post("/createHiredService", validate({
    body: Joi.object({
        sellerServiceId: Joi.string().required(),
        customerUserId: Joi.string().required(),
        requirements: Joi.string().optional(),
        categoryName: Joi.string().required(),
        subcategoryName: Joi.string().required(),
        sellerId: Joi.string().required(),
        total: Joi.number().required(),
    })
}), hiredServiceController.createHiredService);


//categoryRouter.get("/all", categoryController.allCategories);

module.exports = hiredServiceRouter;
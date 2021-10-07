const express = require('express');
const hiredServiceRouter = express.Router();
const hiredServiceController = require("./hiredServiceController");
const HiredService = require("./hiredService");
const { validate, ValidationError, Joi } = require('express-validation');
const authMiddleWare = require("../middlewares/authMiddleware");

hiredServiceRouter.post("/createHiredService", authMiddleWare, validate({
    body: Joi.object({
        sellerServiceId: Joi.string().required(),
        customerUserId: Joi.string().required(),
        requirements: Joi.string().optional().allow(""),
        sellerId: Joi.string().required(),
        total: Joi.number().required(),
        customerEmail: Joi.string().email().required(),
    })
}), hiredServiceController.createHiredService);

hiredServiceRouter.get("/getHiredService", hiredServiceController.getHiredService);

hiredServiceRouter.put("/updateStatusHiredService", validate({
    body: Joi.object({
        hiredServiceId: Joi.string().required(),
        status: Joi.number().required(),
    })
}), hiredServiceController.updateStatusHiredService);

hiredServiceRouter.get("/getHiredServicesList", authMiddleWare , hiredServiceController.getHiredServicesList);

hiredServiceRouter.get("/getActiveServices", authMiddleWare , hiredServiceController.getActiveServices);

hiredServiceRouter.get("/getCompletedServices", authMiddleWare , hiredServiceController.getCompletedServices);
//categoryRouter.get("/all", categoryController.allCategories);

module.exports = hiredServiceRouter;
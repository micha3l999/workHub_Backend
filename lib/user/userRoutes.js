const express = require('express');
const userRouter = express.Router();
const userController = require("./userController");
const authMiddleWare = require("../middlewares/authMiddleware");
const { validate, ValidationError, Joi } = require('express-validation');


userRouter.post("/signup", validate({
  body: Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    countryCode: Joi.string().required().max(4).min(2),
    phone: Joi.string().required().length(9),
    role: Joi.string().optional(),
    imageOriginal: Joi.string().required().uri(),
    imageThumbnail: Joi.string().required().uri(),
    birthDate: Joi.string().optional(),
  })
}), userController.registerUser);

userRouter.post("/login", validate({
  
  body: Joi.object({
    phone: Joi.string().length(9),
  })
}),userController.getUserData);

module.exports = userRouter;
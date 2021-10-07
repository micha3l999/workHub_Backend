const express = require('express');
const userRouter = express.Router();
const userController = require("./userController");
const authMiddleWare = require("../middlewares/authMiddleware");
const { validate, ValidationError, Joi } = require('express-validation');


userRouter.post("/signup", userController.registerUser);

userRouter.post("/login", validate({
  
  body: Joi.object({
    phone: Joi.string().length(9).optional(),
    email: Joi.string().optional(),
  })
}),userController.getUserDataLogin);

userRouter.post("/createAdmin", validate({
  body: Joi.object({
    email: Joi.string().email().required(),
    role: Joi.string().required(),
    name: Joi.string().required(),
    lastName: Joi.string().required(),
  })
}),userController.registerAdmin);


module.exports = userRouter;
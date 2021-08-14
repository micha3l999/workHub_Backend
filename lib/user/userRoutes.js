const express = require('express');
const userRouter = express.Router();
const userController = require("./userController");
const authMiddleWare = require("../middlewares/authMiddleware");
const { validate, ValidationError, Joi } = require('express-validation');


userRouter.post("/signup", userController.registerUser);

userRouter.post("/login", validate({
  
  body: Joi.object({
    phone: Joi.string().length(9),
  })
}),userController.getUserDataLogin);

userRouter.get("/getUserDataHome", authMiddleWare ,userController.getUserDataHome);

module.exports = userRouter;
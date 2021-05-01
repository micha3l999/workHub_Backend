const express = require('express');
const userRouter = express.Router();
const userController = require("./userController");
const User = require("./user");
const authMiddleWare = require("../middlewares/authMiddleware");

userRouter.post("/signup", userController.REGISTER_USER);
userRouter.post("/login", userController.GETUSERDATA);

module.exports = userRouter;
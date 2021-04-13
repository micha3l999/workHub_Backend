const express = require('express');
const router = express.Router();
const userController = require("./userController");
const User = require("./user");
const authMiddleWare = require("../middlewares/authMiddleware");

//router.get("/userExist", authMiddleWare, userController.ISUSERALREADYREGISTERED);

router.post("/signup", userController.REGISTER_USER);
router.post("/login", userController.GETUSERDATA);

module.exports = router;
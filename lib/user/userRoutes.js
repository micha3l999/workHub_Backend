const express = require('express');
const router = express.Router();
const userController = require("./userController");
const User = require("./user");

router.get("/userExist", async (request, response) => {userController.ISUSERALREADYREGISTERED(request, response)})
router.post("/signup", async (request, response) => {userController.REGISTER_USER(request, response)});


module.exports = router;
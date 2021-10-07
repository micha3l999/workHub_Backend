const express = require('express');
const categoryRouter = express.Router();
const categoryController = require("./categoryController");
const Category = require("./category");
const { validate, ValidationError, Joi } = require('express-validation')
const authMiddleWare = require("../middlewares/authMiddleware");


categoryRouter.post("/create", validate({
    body: Joi.object({
        categoryName: Joi.string().required(),
        categoryDescription: Joi.string().required(),
        image: Joi.string().uri().required(),
    })
}), authMiddleWare, categoryController.createCategory);


categoryRouter.get("/all", categoryController.allCategories);

categoryRouter.get("/home", categoryController.homeCategories);

module.exports = categoryRouter;
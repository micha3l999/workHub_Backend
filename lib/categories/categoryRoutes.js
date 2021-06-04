const express = require('express');
const categoryRouter = express.Router();
const categoryController = require("./categoryController");
const Category = require("./category");
const { validate, ValidationError, Joi } = require('express-validation')

categoryRouter.post("/create", validate({
    body: Joi.object({
        categoryName: Joi.string().required(),
        categoryDescription: Joi.string().required(),
        image: Joi.string().uri().required(),
    })
}), categoryController.createCategory);


categoryRouter.get("/all", categoryController.allCategories);

categoryRouter.get("/home", categoryController.homeCategories);

module.exports = categoryRouter;
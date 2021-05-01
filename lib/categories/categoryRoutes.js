const express = require('express');
const categoryRouter = express.Router();
const categoryController = require("./categoryController");
const Category = require("./category");
const { validate, ValidationError, Joi } = require('express-validation')

categoryRouter.post("/create", validate({
    body: Joi.object({
        categoryName: Joi.string().required(),
        categoryDescription: Joi.string().required()
    })
}), categoryController.CREATE_CATEGORY);


categoryRouter.get("/all", categoryController.GET_ALL_CATEGORIES);

module.exports = categoryRouter;
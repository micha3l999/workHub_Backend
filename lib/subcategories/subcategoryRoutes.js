const express = require('express');
const subcategoryRoute = express.Router();
const subcategoryController = require("./subcategoryController");
const Subcategory = require("./subcategory");
const { validate, ValidationError, Joi } = require('express-validation')

subcategoryRoute.post("/create", validate({
    body: Joi.object({
        subcategoryName: Joi.string().required(),
        categoryId: Joi.string().required()
    })
}), subcategoryController.createSubcategory);


//categoryRouter.get("/all", categoryController.allCategories);

module.exports = subcategoryRoute;
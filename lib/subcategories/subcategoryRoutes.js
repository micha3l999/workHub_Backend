const express = require('express');
const subcategoryRoute = express.Router();
const subcategoryController = require("./subcategoryController");
const { validate, ValidationError, Joi } = require('express-validation')

subcategoryRoute.post("/create", validate({
    body: Joi.object({
        subcategoryName: Joi.string().required(),
        categoryId: Joi.string().required(),
        image: Joi.string().optional(),
        subCategoryDescription: Joi.string().optional(),
    })
}), subcategoryController.createSubcategory);

subcategoryRoute.get("/all", subcategoryController.allSubCategories);


module.exports = subcategoryRoute;
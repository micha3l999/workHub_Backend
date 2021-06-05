const express = require('express');
const searchRoute = express.Router();
const searchController = require("./searchController");
const { validate, ValidationError, Joi } = require('express-validation')

searchRoute.get("/all", searchController.searchInDataBase);

module.exports = searchRoute;
const express = require('express')
const Router = express.Router();
const categoryController = require("../controller/category.controller.js")



Router.route('/category/country') 
    .get(categoryController.GetCountry)

Router.route("/category/year")
    .get(categoryController.GetYear)


module.exports = Router
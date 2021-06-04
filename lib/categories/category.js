const mongoose = require('mongoose');
const { imageSchema } = require('../globalSchemas/globalSchemas');


const categorySchema = new mongoose.Schema({

    categoryName: {
        type: String,
        require: [true, "The categoty name is required."]
    },

    categoryDescription: {
        type: String,
        require: [true, "The category description is required."]
    },

    image: {
        type: String,
        require: [true, "The image category is required."]
    },

})

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
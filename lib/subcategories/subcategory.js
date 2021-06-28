const mongoose = require('mongoose');


const subcategorySchema = new mongoose.Schema({

    subcategoryName: {
        type: String,
        require: true
    },

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

    image: {
        type: String,
    }
})

const Subcategory = mongoose.model("Subcategory", subcategorySchema);
module.exports = Subcategory;
const mongoose = require('mongoose');


const subcategorySchema = new mongoose.Schema({

    nombre: {
        type: String,
        require: true
    },

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }

})

const Subcategory = mongoose.model("Subcategory", subcategorySchema);
module.exports = Subcategory;
const mongoose = require('mongoose');


const sellerServicesSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    images: [
      {
        type: String,
        require: true
      }
    ],

    price: {
        type: String,
        require: true
    },

    duration: {
        type: String,
        require: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

    subcategory: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subcategory"
    },
})

const SellerServices = mongoose.model("SellerServices", sellerServicesSchema);
module.exports = SellerServices;
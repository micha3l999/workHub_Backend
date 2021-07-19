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

    mainImage: {
        type: String,
        require: true,
    },

    price: {
        type: Number,
        require: true
    },

    duration: {
        type: Float32Array,
        require: true
    },

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

    subcategoryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subcategory"
    },

    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
    },
}, { timestamps: true });

const SellerServices = mongoose.model("SellerServices", sellerServicesSchema);
module.exports = SellerServices;
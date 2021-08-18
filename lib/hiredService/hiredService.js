const mongoose = require('mongoose');
const status = require("./hiredServiceConfig.js");

const hiredServiceSchema = new mongoose.Schema({

    sellerServiceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SellerServices",
        require: [true, "The sellerServiceId is required."]
    },

    customerUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: [true, "The customerUserId is required."]
    },
    
    requirements: {
      type: String,
    },

    total: {
      type: Number,
      required: [true, "the total price of seller service is required"],
    },

    status: {
      type: Number,
      enum: Object.values(status),
      default: status.PENDING,
    },

    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      require: true,
    },

}, { timestamps: true })

const HiredService = mongoose.model("HiredService", hiredServiceSchema);
module.exports = HiredService;
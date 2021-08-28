const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    
  statusCode: {
    type: String,
  },

  status: {
    type: String,
  },

  orderId: {
    type: String,
  },

  hiredService: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HiredService",
  },

  amount: {
    type: Number
  },

  serviceName: {
    type: String,
  },

  serviceSubcategory: {
    type: String,
  },

  currency: {
    type: String,
  },

  payer: {
    givenName: {
      type: String,
    },
    surname: {
      type: String,
    },
    emailAddress: {
      type: String,
    },
  },
  
}, { timestamps: true } );

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
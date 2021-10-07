const mongoose = require('mongoose');

const customerScherma = new mongoose.Schema({

    favServices: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SellerServices",
        }
    ],

    favSellers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seller",
        }
    ],

}, { timestamps: true } );


const Customer = mongoose.model("Customer", customerScherma);

module.exports = Customer;
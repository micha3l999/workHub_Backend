const mongoose = require('mongoose');

const customerScherma = new mongoose.Schema({

    favServices: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "",
        }
    ],

    favSellers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seller",
        }
    ],

});


const Customer = mongoose.model("Customer", customerScherma);

module.exports = Customer;
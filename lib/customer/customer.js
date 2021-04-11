const mongoose = require('mongoose');

const customerScherma = new mongoose.Schema({

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }

});
const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    earnings: {
        type: number,
        required: true,
        default: 0
    },

    rating: {
        type: number,
        require: true,
        default: 5,
        max: 5,
        min: 1,
    },

    skills: {
        type: string,
        require: true,
        enum: ["", "", "", ""]
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    }

},

    { timestamps: true }

);

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
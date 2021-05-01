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


    professions: [
        {
            category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category"
            },
            subcategories: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Subcategory"
                }
            ],
        }
    ],

    skills: [
        {
            type: String,
            require: true,
        },
    ],
},

    { timestamps: true }

);

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
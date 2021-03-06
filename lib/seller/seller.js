const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    earnings: {
        type: Number,
        required: true,
        default: 0
    },

    rating: {
        type: Number,
        require: true,
        default: 5,
        max: 5,
        min: 1,
    },

    totalServices: {
        type: Number,
        default: 0,
    },

    professions: [
        {
            _id : false,
            category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category"
            },
            categoryName: {
                type: String,
                require: true,
            },
            subcategories: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Subcategory"
                }
            ],
        },
    ],

    description: {
        type: String,
        require: true,
    },

    skills: [
        {
            /**
             * 0. Honorable
             * 1. Responsable
             * 2. Educado
             * 3. Rápido
            */
            type: String,
        },
    ],

    busy: {
        type: Boolean,
        default: false
    }
},

    { timestamps: true }

);

const Seller = mongoose.model("Seller", sellerSchema);
module.exports = Seller;
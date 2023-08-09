const mongoose = require('mongoose');

const vendorProductSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        // required: true,
    },
    productPrice: {
        type: String,
        // required: true,
    },
    productDescription: {
        type: String,
        // required: true,
    },
    productCategory: {
        type: String,
        // required: true,
    },
    productFreshnes: {
        type: String,
        // required: true,
    },
    productComment: {
        type: String,
        // required: true,
    },
    url: {
        type: String,
        // required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
});

exports.vendorProductModel = mongoose.model('product', vendorProductSchema);
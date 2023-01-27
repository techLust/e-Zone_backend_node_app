const mongoose = require('mongoose');

const vendorProductSchema = new mongoose.Schema({
    assetId: { type: String, required: true},
    filename: {type: String, required: true},
    format: {type: String, required: true},
    url: { type: String, required: true}
},{
    timestamps: true
});

exports.vendorProductModel = mongoose.model('product', vendorProductSchema);
const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    orderedItem: {
        type: Array,
    },
   paymentHistory: {
    type: Array
    },
    address: {
        type: Map
    }
},
{
    timestamps: true
})


 const OrderModel = mongoose.model('orders', orderSchema)
 module.exports = { OrderModel }
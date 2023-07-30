const { OrderModel } = require('../../models/user/ordersModel')
const UserModel = require('../../models/user/signUpUser')

exports.placeOrder = async (req, res) => {
    try {
        const userId = req.params.id

        if(!userId) return res.status(500).json({status: 'Please login to continue', e})
        const userDetails = await UserModel.findById(userId)
        console.log(userDetails)

        if(userDetails){
        const orderDetails = OrderModel.create({
            userId: userDetails._id,
            orderedItem: userDetails.cart,
            paymentHistory: '',
            address: userDetails.address[0]
        })
        return res.status(200).json({status: 'Your order placed successful', orderDetails})
    }
        console.log('Place order successful')
    } catch (e) {
        console.log(e)
        return res.status(500).json({status: 'Something went wrong', e})
    }
}
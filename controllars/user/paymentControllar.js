const { OrderModel } = require('../../models/user/ordersModel')

exports.getAllPayments = async (req, res) => {
    try{
        const userId = req.params.userId;

        const paymentDetails = await OrderModel.find({userId: userId})
        console.log(paymentDetails)
        return res.status(200).json({status: 'success', paymentHistory: paymentDetails[0]})
    }catch(e){
        console.log(e)
    }
}
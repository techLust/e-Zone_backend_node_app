const Razorpay = require('razorpay')
const { OrderModel } = require('../../models/user/ordersModel')
const UserModel = require('../../models/user/signUpUser')

exports.placeOrder = async (req, res) => {
    try {
        console.log("Place order API called")
        const userId = req.params.userId
        const price = req.body
        const productPrice = Object.keys(price)

        console.log(userId, price)

        if (!userId) return res.status(500).json({ status: 'Please login to continue', e })
        const userDetails = await UserModel.findById(userId)

        console.log("USER DEATAILS", userDetails)

        const razorpayInstance = new Razorpay({
            key_id: process.env.KeyId,
            key_secret: process.env.secretKey
        });

        const options = {
            amount: productPrice[0] * 100,
            currency: "INR",
            receipt: "receipt#1",
            payment_capture: 0,
        };

        razorpayInstance.orders.create(options, async (err, order) => {
            if (err) {
                return res.status(500).json({
                    message: "Something Went Wrong",
                });
            }

            const orderDetails = await OrderModel({
                userId: userDetails._id,
                orderedItem: userDetails.cart,
                paymentHistory: order,
                address: userDetails.address[0],
            })

            orderDetails.save()
            console.log('Place order successful', orderDetails)
            console.log('PAYMENT DETAILS', order)
            return res.status(200).json({ status: 'Your order placed successful', orderDetails })
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json({ status: 'Something went wrong', e })
    }
}


const razorpayInstance = new Razorpay({
    // Replace with your key_id
    key_id: process.env.KeyId,
    // Replace with your key_secret
    key_secret: process.env.secretKey
});

exports.makePayment = (req, res) => {
    try {
        const price = req.body
        const productPrice = Object.keys(price)
        console.log("Make payment API called", price)
        // res.render('payment.ejs', {error: false});
        const options = {
            amount: 100,
            currency: "INR",
            receipt: "receipt#1",
            payment_capture: 0,
            // 1 for automatic capture // 0 for manual capture
        };

        razorpayInstance.orders.create(options, async (err, order) => {
            if (err) {
                return res.status(500).json({
                    message: "Something Went Wrong",
                });
            }
            return res.status(200).json(order);
        });

    } catch (e) {
        console.log("MAKE PAYMENT ERROR", e)
    }
}


// app.post("/capture/:paymentId", (req, res) => {
// exports.capturePayment = async (req, res) => {
//     try {
//         console.log('Capture payment api called')
//         return request(
//             {
//                 method: "POST",
//                 url: `https://${process.env.KeyId}:${process.env.secretKey}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
//                 form: {
//                     amount: 10 * 100, // amount == Rs 10 // Same As Order amount
//                     currency: "INR",
//                 },
//             },
//             async function (err, response, body) {
//                 if (err) {
//                     return res.status(500).json({
//                         message: "Something Went Wrong",
//                     });
//                 }
//                 console.log("Status:", response.statusCode);
//                 console.log("Headers:", JSON.stringify(response.headers));
//                 console.log("Response:", body);
//                 return res.status(200).json(body);
//             });
//     } catch (err) {
//         return res.status(500).json({
//             message: "Something Went Wrong",
//         });
//     }
// };

exports.getAllOrders = async (req, res) => {
    try{
        console.log('get all order called')
        const { userId } = req.params
        console.log(userId)
        const orders = await OrderModel.find({ 'userId': userId})
        console.log(orders)
        return res.status(200).json({'status': 'success', orders})
    }catch(e){
        console.log(e)
    }
}

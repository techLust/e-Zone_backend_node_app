const UserModel = require("../../models/user/signUpUser");

exports.addProductToCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    if (userId) {
      const userDetails = await UserModel.findById(userId);
      // console.log(userDetails);
      if (userDetails) {
        userDetails.cart.push({ productId, userId, amount: 1 });
        console.log("Product added to cart");
        userDetails.save();
        return res
          .status(200)
          .json({ status: "Product added to cart", userDetails });
      }
    } else {
      return res.json({ status: "Failed to add product in cart" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: "Something went wrong" });
  }
};

exports.getCartProduct = async (req, res) => {
  try{
    const { userId } = req.params.id
    console.log("GOT PRODUCT", userId)

    if(!userId){
      return res.status(500).json({status: 'Faild to get product'})
    }
    if(userId){
      const userDetails = await UserModel.findById(userId)
      console.log(userDetails)
      const cartItems = userDetails.cart
      return res.status(200).json({status: 'Your cart items', cartItems})

    }
  }catch(e){
    console.log(e)
    return res.status(500).json({status: 'Somethting went wrong'})
  }
}

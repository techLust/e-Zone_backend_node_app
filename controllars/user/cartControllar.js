const UserModel = require("../../models/user/signUpUser");
const {
  vendorProductModel,
} = require("../../models/vendor/vendorProductModel");

exports.addProductToCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    if (userId) {
      const userDetails = await UserModel.findById(userId);
      const product = await vendorProductModel.findById(productId);

      const addedProduct = userDetails.cart.map((el) => {
        if (el.productId === productId)
          return res.json({ status: "Product already in your cart" });
      });

      if (userDetails) {
        userDetails.cart.push({
          productId,
          userId,
          amount: 1,
          price: product.productPrice,
          productName: product.productName,
          url: product.url,
        });
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

exports.getCartProducts = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("GOT PRODUCT", userId);

    if (!userId) {
      return res.status(500).json({ status: "Faild to get product" });
    }
    if (userId) {
      const userDetails = await UserModel.findById(userId);
      const cartItems = userDetails.cart;

      return res.status(200).json({ status: "Your cart items", cartItems });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: "Somethting went wrong" });
  }
};

exports.deleteAllItem = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Deleted all items", userId);
    const userDetails = await UserModel.findById(userId);
    userDetails.cart = [];
    const updateCart = await UserModel.findByIdAndUpdate(userId, {
      cart: userDetails.cart,
    });
    return res.status(200).json({ status: "Cart is empty", updateCart });
  } catch (e) {
    console.log("Failed to delete all items");
    return res.status(500).json({ status: "Failed to empty cart", updateCart });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { userId, productId } = req.query;
    console.log("delete product from cart", userId, productId);

    const userDetails = await UserModel.findById(userId);

    if (userDetails?.cart) {
      const items = userDetails.cart.filter(
        (el) => !(el.productId === productId && el.userId === userId)
      );
      const deleteItem = userDetails.cart = items
      userDetails.save();
    }
    return res
      .status(200)
      .json({ status: "Product deleted successfully", userDetails });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: "Failed to delete" });
  }
};

exports.increaseQuantity = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Item quantiry increased");
    const userDetails = await UserModel.findById(userId);
    const cartItem = userDetails.cart;
    return res.status(200).json({ status: "Item incresed" });
  } catch (e) {
    console.log("Failed to increase quantiry");
    return res.status(500).json({ status: "Failed to increased" });
  }
};

exports.decreaseQuantity = async (req, res) => {
  try {
    console.log("Item quantiry decreased");
    const userId = req.params.id;
    const userDetails = await UserModel.findById(userId);
    const cartItem = userDetails.cart;
    return res.status(200).json({ status: "Item decresed" });
  } catch (e) {
    console.log("Failed to decrease quantiry");
    return res.status(500).json({ status: "Failed to decreased" });
  }
};

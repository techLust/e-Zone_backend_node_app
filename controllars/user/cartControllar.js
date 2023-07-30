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
        return res.status(200).json({ status: "Product added to cart", userDetails });
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
      userDetails.cart = items;
      userDetails.save();
    }
    return res.status(200).json({ status: "Product deleted successfully", userDetails });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: "Failed to delete" });
  }
};

exports.increaseQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.query;
    console.log("Item quantiry increased", userId, productId);
    const userDetails = await UserModel.findById(userId);
    const itemIndex = userDetails.cart.findIndex(el => el?.userId === userId && el?.productId === productId);
    console.log(itemIndex);
    userDetails.cart[itemIndex].amount += 1;
    userDetails.markModified('cart');
    userDetails.save((err, data) => {
      if(err) console.log(err)
      else console.log("UPDATED DATA", data)
    });

    return res.status(200).json({ status: "Item incresed", userDetails });
  } catch (e) {
    console.log("Failed to increase quantiry", e);
    return res.status(500).json({ status: "Failed to increased" });
  }
};

exports.decreaseQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.query;
    const userDetails = await UserModel.findById(userId);
    const itemIndex = userDetails.cart.findIndex(el => el?.userId === userId && el?.productId === productId);
    userDetails.cart[itemIndex].amount -= 1;
    userDetails.markModified('cart');
    userDetails.save((err, data) => {
      if(err) console.log(err)
      else console.log("UPDATED DATA", data)
    });

    return res.status(200).json({ status: "Item incresed", userDetails });
  } catch (e) {
    console.log("Failed to increase quantiry", e);
    return res.status(500).json({ status: "Failed to increased" });
  }
};

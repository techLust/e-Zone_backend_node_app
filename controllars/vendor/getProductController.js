const {
  vendorProductModel,
} = require("../../models/vendor/vendorProductModel");

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const productLists = await vendorProductModel.find();
    if (productLists != null) {
      return res.status(200).json({
        status: "Retrieved product list",
        data: productLists,
      });
    } else {
      res.status(500).json({
        status: "Failed to retrieve produts",
        productLists,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Something went wrong" });
  }
};

//GET PRODUCT BY ID
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await vendorProductModel.findById(productId);
    if (!product) {
      return res.status(500).json({ status: "Product fetched failed" });
    }
    if (product) {
      return res.status(200).json({
        status: "Product fetched",
        product,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: "Something went wrong" });
  }
};

const { vendorProductModel } = require('../../models/vendor/vendorProductModel');

exports.getProducts = async (req, res) => {
    try {
        const productLists = await vendorProductModel.find();   
        if (productLists != null) {
            return res.status(200).json({
                status: 'Retrieved product list',
                data: productLists,
            })
        } else {
            res.status(500).json({
                status: 'Failed to retrieve produts',
                data: productLists,
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 'Something went wrong' })
    }
}   
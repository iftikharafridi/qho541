const Products = require('../models/Products')
module.exports = async (req, res) => {
    const productItems = await Products.find();   

    // console.log(productItems)
    
    res.render('shop', {products: productItems})
}
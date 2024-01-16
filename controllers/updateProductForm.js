const Products = require('../models/Products')
module.exports = async (req,res) => {
    // console.log(req.params.id)
  ///  const result = await Products.find({_id: req.params.id})
   // const result = await Products.findOne({_id: req.params.id})
   const result =  await Products.findById(req.params.id)
   console.log(result)

    res.render('updateProductForm', {product: result})
}
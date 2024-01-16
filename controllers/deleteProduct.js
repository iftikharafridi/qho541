const Products = require('../models/Products')
module.exports = async (req, res) => {
    
   console.log(req.params.id)
   await Products.deleteOne({_id: req.params.id})
   // await Products.deleteMany()
    //  res.send('Successfully Deleted')
    res.redirect('/shop')
}
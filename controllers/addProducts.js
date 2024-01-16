const Products = require('../models/Products')
module.exports = async (req, res) => {
    const productItems = [
        {name: 'Watch', price: 50, path: ''},
        {name: 'Ring', price: 60, path: ''},
        {name: 'Watch', price: 50, path: ''},
        {name: 'Ring', price: 60, path: ''},
        {name: 'Watch', price: 50, path: ''},
        {name: 'Ring', price: 60, path: ''}       
     ]
  
     // const productItems = {name: 'Watch', price: 50, path: ''} 
     //const newProducts = new Products(productItems)
    // await newProducts.save();
  
    await Products.insertMany(productItems)
   // await Products.deleteMany()
     res.send('Successfully added')
}
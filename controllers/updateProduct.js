const Products = require('../models/Products')
const path = require('path')

module.exports = async (req, res) => {
    
  console.log(req.body);
  console.log(req.files);
     // const productItems = {name: 'Watch', price: 50, path: ''} 
     //const newProducts = new Products(productItems)
    // await newProducts.save();

    if(!req.files) {
      // Just keep the same image and update the rest of the values
      //console.log("You didn't uploaded an image")
      await Products.updateOne({_id: req.body._id}, {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
      })
    } else {
      // Update all the values
      let myfile = req.files.myfile;
    
      
      myfile.mv(path.resolve(__dirname, '../public/images', myfile.name))
     
     
      await Products.updateOne({_id: req.body._id}, {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        path: '/images/'+myfile.name
      })

    }
  
    
   // await Products.deleteMany()
     //res.send('Successfully updated ')
     res.redirect('shop')
}
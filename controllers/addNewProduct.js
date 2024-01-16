const Products = require('../models/Products')
const path = require('path')
module.exports = async (req, res) => {
    
    // console.log('I am in addNewProduct controller')
    // console.log(req.body)
    let myfile = req.files.myfile;
    // console.log(myfile.name)
    // console.log(path.extname(myfile.name))
    
    myfile.mv(path.resolve(__dirname, '../public/images', myfile.name))
    // Syntax-01
     // const productItems = {name: 'Watch', price: 50, path: ''} 
     //const newProducts = new Products(productItems)
    // await newProducts.save();
    
    //Syntax-02
    Products.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        path: '/images/'+myfile.name
    })
  
    //await Products.insertMany(productItems)
    // res.send('Successfully added')
    res.redirect('/')
}
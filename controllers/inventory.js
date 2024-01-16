const Inventory = require('../models/Inventory')
module.exports = async (req, res) => {
    const inventoryItems = await Inventory.find();   

   console.log(inventoryItems)
   
   res.send(inventoryItems)
}
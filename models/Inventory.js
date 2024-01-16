const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    "item": String,
    "qty": Number,
    "size": {
        "h": Number,
        "w": Number,
        "uom": String
    },
    "status": String
});

const Inventory = mongoose.model('Inventory', inventorySchema, 'inventory');

module.exports = Inventory;
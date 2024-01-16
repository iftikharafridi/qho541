const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Please note that when we create a passord it's not encrypted. We need to encrypt the password. There are different ways or different packages, but we will be using the bcrypt
// First instll the bcrypt package
// > npm install --save bcrypt

// I need to redirect the model to encrypt the password first before saving. for this I need to import/require the bcrypt libaray on the top and add the below lines

userSchema.pre('save', function(next) { // don't use arrow function here, otherwise 'this' keyword doesn't work. So simply use the function () syntax
    console.log("I am in bcrypt hash pre function")
    const user = this;
    const salt = 10; // Higer the salt value the strong encryption it is, but take more computational power.
     bcrypt.hash(user.password, 10, function(error, hash){
        console.log(hash)
        console.error(error)
        user.password = hash
        next()
    })
})

const Users = mongoose.model('Users', userSchema, 'users');

 module.exports = Users;
const Users = require('../models/Users')
const path = require('path')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {

    console.log('I am in loginUser controller')
    //console.log(req.body.username)
    //console.log(req.body.password)
    //const {username, password} = req.body

    const user = await Users.findOne({username: req.body.username});
    console.log(user)
    if (user) {
        // Here the user exist and we will compare the user password with the database encrypted password
        const encryptedPassword = user.password;
        const unecryptedPassword = req.body.password;
        console.log('Valid User')
        bcrypt.compare(unecryptedPassword, encryptedPassword, (error, same) => {
            if(same) {
                console.log('User Login Successfully')
                req.session.userId = user._id;
               // console.log(req.session)
                //req.session.userType = user.type;
                res.redirect('/')
            }
            else {
                console.log("Wrong Password")
                res.render('loginForm', {
                    invalidUserError: null,
                    invalidUserPassword: "Wrong Password"
                })

            }
        })
    }
    else {
        // Here the user doesn't exist and we need to send so message/feedback i.e. invalid username
        console.log('Invalid Username')
        res.render('loginForm', {
            invalidUserError: "Invalid User",
            invalidUserPassword: null
        })
    }

   // res.redirect('/')
}
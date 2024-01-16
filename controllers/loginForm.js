
module.exports = (req,res) => {
    res.render('loginForm',  {
        invalidUserError: null,
        invalidUserPassword: null
    })
}
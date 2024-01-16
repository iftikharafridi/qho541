
module.exports = async (req, res) => {
   // res.redirect('/')
   req.session.destroy()
   res.redirect('loginForm')
}
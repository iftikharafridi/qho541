const express = require('express')
const path = require('path')

const app = express()
const ejs = require('ejs')
app.set('view engine', 'ejs')

app.use(express.static('public'))

// Express sessions
const session = require('express-session')
app.use(session({
    secret: 'keyboard Cat',
    resave: false,
    saveUninitialized: true
}))

const dotenv = require('dotenv')
dotenv.config();

//console.log(process.env)

const fileUload = require('express-fileupload')
app.use(fileUload())

/*
// To receive the parameter, we need to install the body-parser package
 > npm install body-parser
const bodyParser = require('body-parser')
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
*/
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Import mongoose after the installation
const mongoose = require('mongoose')

// Connect with the mongodb database
// mongoose.connect('mongodb://localhost/schema').then(()=>{
//    console.log('Connection successful')
// });

// if you have issue connecting wtih mongodb using the localhost url then use this url 
// mongoose.connect('mongodb://127.0.0.1/gift_store').then(()=>{
//    console.log('Connection successful')
// });
//let mongodb_uri = process.env.MONGODB_URI_LOCAL
let mongodb_uri = process.env.MONGODB_URI_ATLAS
mongoose.connect(mongodb_uri).then(()=>{
   console.log('Connection successful')
});

const Inventory = require('./models/Inventory')

//import Products from './models/Products'
const Products = require('./models/Products')

// Middleware: it's a function that will run on every request
const exampleMiddleware = (req, res, next) => {
    console.log("Thanks for your request. You will get response soon")

    next() // if I don't provide next() funciton, it will hang here. The next mean that the middleware has finished and the next function can be run
}

app.use(exampleMiddleware)

// This is global variable and any global variable is accessble from anywhere, even in EJS as well
global.loggedIn = null;

app.use('*', (req,res,next) => {
    //console.log('My session middleware')
    loggedIn = req.session.userId;
    console.log(loggedIn)
    next()
})

const homeController = require('./controllers/home')
app.get('/', homeController)
// app.get('/', (req,res) => {
//     console.log(`Received request method = ${req.method}, and URL = ${req.url}`)
//    // res.send('Welcome to QHO541') 
//    //res.sendFile(path.resolve(__dirname, 'pages/index.html'))
//    res.render('index')   
// })

const shopController = require('./controllers/shop')
app.get('/shop', shopController)
// app.get('/shop', (req, res) => {
//    // res.send('This is my about message')
//    // res.sendFile(path.resolve(__dirname, 'pages/shop.html'))
//    res.render('shop')
// })

const aboutController = require('./controllers/about')
app.get('/about', aboutController)

// app.get('/about', (req, res) => {
//    // res.send('This is my about message')
//    // res.sendFile(path.resolve(__dirname, 'pages/about.html'))
//    res.render('about')
// })

const contactController = require('./controllers/contact')
app.get('/contact', contactController)

// app.get('/contact', (req, res) => {
//    // res.send('This is my contact message')
//    // res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
//    res.render('contact')
// })

const testimonialController = require('./controllers/testimonial')
app.get('/testimonial', testimonialController)

// app.get('/testimonial', function(req,res){
//   // res.sendFile(path.resolve(__dirname, 'pages/testimonial.html'))
//   res.render('testimonial')
// })

const whyController = require('./controllers/why')
app.get('/why', whyController)

// app.get('/why', function(req,res){
//   // res.sendFile(path.resolve(__dirname, 'pages/why.html'))
//   res.render('why')
// })

// app.get('/inventory', function(req,res){
//    // const inventoryItems = Inventory.find();   

//    // console.log(inventoryItems)
//    Inventory.find().then(function(results){
//       console.log(results)
//       res.send(results);
//    })
   
// })

const newProductFormController = require('./controllers/newProductForm')
app.get('/new/productForm', newProductFormController)

const userRegistrationFormController = require('./controllers/userRegistrationForm')
app.get('/userRegistrationForm', userRegistrationFormController)

const loginFormController = require('./controllers/loginForm')
app.get('/loginForm', loginFormController)

// const productValidationMiddleware = (req, res, next) => {
//    // console.log("I am in productValidationMiddleware")
//   //  console.log(req.files)
//     if(req.body.name == null || req.body.price == null || req.files == null || req.body.description == null){
//         console.log("Sorry all the fields are mandatory")
//         return res.redirect('/new/productForm')
//     }
//     next()
// }

// app.use('/addNewProduct', productValidationMiddleware)

const addNewProductController = require('./controllers/addNewProduct')
app.post('/addNewProduct', addNewProductController)

const registerUserController = require('./controllers/registerUser')
app.post('/registerUser', registerUserController)

const loginUserController = require('./controllers/loginUser')
app.post('/loginUser', loginUserController)

const logoutController = require('./controllers/logout')
app.get('/logout', logoutController)

const addProductsController = require('./controllers/addProducts')
app.get('/addProducts', addProductsController)

const deleteProductsController = require('./controllers/deleteProduct')
app.get('/product/delete/:id', deleteProductsController)

const updateProductFormController = require('./controllers/updateProductForm')
app.get('/updateProductForm/:id', updateProductFormController)

const updateProductController = require('./controllers/updateProduct')
app.post('/updateProduct', updateProductController)

// app.get('/addProducts', async(req,res) => {
//    const productItems = [
//       {name: 'Watch', price: 50, path: ''},
//       {name: 'Ring', price: 60, path: ''},
//       {name: 'Watch', price: 50, path: ''},
//       {name: 'Ring', price: 60, path: ''},
//       {name: 'Watch', price: 50, path: ''},
//       {name: 'Ring', price: 60, path: ''}       
//    ]

//    // const productItems = {name: 'Watch', price: 50, path: ''} 
//    //const newProducts = new Products(productItems)
//   // await newProducts.save();

//   await Products.insertMany(productItems)
//    res.send('Successfully added')
// })

const getProductsController = require('./controllers/getProducts')
app.get('/getProducts', getProductsController)

// app.get('/getProducts', async (req,res) => {
//    const productItems = await Products.find();   

//    console.log(productItems)
   
//    res.send(productItems)
   
// })

const inventoryController = require('./controllers/inventory')
app.get('/inventory', inventoryController)

// app.get('/inventory', async (req,res) => {
//    const inventoryItems = await Inventory.find();   

//    console.log(inventoryItems)
   
//    res.send(inventoryItems)
   
// })

const notFoundController = require('./controllers/notFound')
app.get('*', notFoundController)

// app.get('*', (req, res) => {
//    // res.send('Sorry page not found')
//   // res.sendFile(path.resolve(__dirname, 'pages/notfound.html'))
//   res.render('notfound')
// })

// const port = 4000;
// const hostname = '127.0.0.1';

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

app.listen(port, hostname, () => {
    console.log(`Server ${hostname} is running on port number ${port}`);
    console.log(`Server Url = https://${hostname}:${port}`);
});

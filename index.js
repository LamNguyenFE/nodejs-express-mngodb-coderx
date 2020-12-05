//les 18 Environment variables
//les 19 Debugging nodejs express
require('dotenv').config()
// console.log(process.env)
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cookieParser = require('cookie-parser')

const userRoute = require('./routes/user.route')
const productRoute = require('./routes/product.route')
const authRoute = require('./routes/auth.route')
const cartRoute = require('./routes/cart.route')
const authMiddleware = require('./middlewares/auth.middleware')
const mongoose = require('mongoose');
const sessionMiddleware = require('./middlewares/session.middleware')
app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json()) // for parsing application/json
app.use(cookieParser(process.env.SESSION_SECRET || 'the_secret_text'))
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//static file
app.use(express.static('public'))
//apply to all url 
app.use(sessionMiddleware)
// app.use(csurf({ cookie: true }))
// setup route middlewares


// app.use(function (req, res, next) {
//     res.locals._csrf = req.csrfToken()
//     next()
// })

app.get('/', (req, res) => {
    // res.send('Hello World!<a href="/users">User List </a>')
    res.redirect('/users')
    //res.render('index', { title: 'Hey ...', message: 'Hello there!' })

})



app.get('/pug', function (req, res) {
    res.render('index', { title: 'Hey LAM', message: 'Hello there!' })
})

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/products', productRoute);
app.use('/auth', authRoute);

app.use('/cart', cartRoute);

// app.use(csurf({ cookie: true }))

//les 8 - express route - chia nho code folder route/user.route.js

//les 9 mvc controler

//callback to no when server start
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



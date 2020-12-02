const express = require('express')
const app = express()
const port = 3000

const userRoute = require('./routes/user.route')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//static file
app.use(express.static('public'))


app.get('/', (req, res) => {
    res.send('Hello World!<a href="/users">User List </a>')
})



app.get('/pug', function (req, res) {
    res.render('index', { title: 'Hey LAM', message: 'Hello there!' })
})

app.use('/users', userRoute);



//les 8 - express route - chia nho code folder route/user.route.js

//les 9 mvc controler

//callback to no when server start
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



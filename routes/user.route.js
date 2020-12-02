const express = require('express');

const router = express.Router();
const db = require('../db')
const shortid = require('shortid');
const userController = require('../controller/user.controller')
const validate = require('../validate/user.validate')

//les 13 middleware 
//
function middleware1(req, res, next) {
    //khi goi res.send la ket thuc request
    //nen md2 ko duoc goi
    //result : Hello from md1
    //res.send('Hello from md1')
    console.log('md1')
    next()
}
// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
function middleware2(req, res, next) {
    console.log('md2')
    res.send('Hello from md2')
    next()
}

function middleware3(req, res, next) {
    console.log('md3')
    res.send('Hello from md3')
    next()
}

function validate1(req, res, next) {
    //array of errors
    //libraris validate -> midleware
    var errors = [];
    if (!req.body.name) {
        errors.push('Name is required.');
    }
    if (!req.body.phone) {
        errors.push('Phone is required.');
    }
    if (errors.length) {
        res.render('users/create', {
            errors: errors,
            values: req.body,
        })
        return
    }
    //quen next se goi infinite
    next();
}


router.get('/test', middleware1, middleware2, middleware3)

router.get('/', userController.index)

//les 3 GET INPUT FORM
//http://localhost:3000/users/search
//{}

// http://localhost:3000/users/search?q=th&age=10
// {
//     "q": "th",
//     "age": "10"
// }



router.get('/search', userController.search)

//les 4 post 

router.get('/create', userController.create)

router.post('/create', validate.validate, userController.postCreate)

//les 6 - low db

// les 7 - view user - shortid - route params ( string ) parseInt
//route params
router.get('/:id', userController.get)


module.exports = router;
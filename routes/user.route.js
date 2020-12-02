const express = require('express');

const router = express.Router();
const db = require('../db')
const shortid = require('shortid');
const userController = require('../controller/user.controller')

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

router.post('/create', userController.postCreate)

//les 6 - low db

// les 7 - view user - shortid - route params ( string ) parseInt
//route params
router.get('/:id', userController.get)


module.exports = router;
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const express = require('express');

const router = express.Router();
const db = require('../db')
const shortid = require('shortid');
const userController = require('../controller/user.controller')
const validate = require('../validate/user.validate')
const authMiddleware = require('../middlewares/auth.middleware')

const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
// file
// destination: "./public/uploads/"
// encoding: "7bit"
// fieldname: "avatar"
// filename: "avatar-1606987495576"
// mimetype: "image/png"
// originalname: "img1.png"
// path: "public\uploads\avatar-1606987495576"
// size: 27350


var upload = multer({ storage: storage })
// var upload = multer({ dest: './public/uploads/' })

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

//les 14 cookie

router.get('/cookie', function (req, res, next) {
    res.cookie('user_id', 12345)
    res.send('Cookie seted')

})

//ung dung luu thong tin dang nhap
//server gui ve
//browser luu lai
//tu request tiep theo browser se gui cookie theo 
router.get('/test-cookie', function (req, res, next) {

    // res.send('Cookie seted id' + JSON.stringify(req.cookies))
    res.send('Cookie seted id' + req.cookies.user_id)

})

router.get('/test', middleware1, middleware2, middleware3)

router.get('/', authMiddleware.requireAuth, userController.index)

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

router.get('/create', csrfProtection, userController.create)
//vai, phai de middleware csrf sau file upload
router.post('/create', upload.single('avatar'), validate.validate, csrfProtection, userController.postCreate)

router.get('/edit/:id', userController.edit)

router.post('/edit/:id', upload.single('avatar'), validate.validate, userController.postEdit)

router.get('/delete/:id', userController.delete)

//les 6 - low db

// les 7 - view user - shortid - route params ( string ) parseInt
//route params
router.get('/:id', userController.get)

module.exports = router;
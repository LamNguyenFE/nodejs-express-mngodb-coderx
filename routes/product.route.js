const express = require('express');

const router = express.Router();

const productController = require('../controller/product.controller')

router.get('/', productController.index)

//pagination method 2
// router.get('/method2', productController.index2)

module.exports = router;
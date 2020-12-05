const db = require('../db')
const Product = require('../models/product.model')
//les 20 pagination
module.exports.indexLowdb = function (req, res) {
    //methoad 1 : slice array

    // /products?page = 2
    // items per page x = 3
    // Page 1 : 0 1 2
    // Page 2 : 0 1 2
    // Page 1 : 0 1 2
    // Page 1 : 0 1 2


    //total : 9
    //get items in page n(1), widh x(3) items per page 
    //begin = (n-1) * x ( n=1, x=3, begin = 0)  ( n=2, x=3, begin = 3) 
    //end = (n-1)*x + x = n*x (n=1, x=3, end =3) ( n=2, x=3, begin = 6) 
    //items = array.slice(begin, end)
    const products = db.get('products').value()
    let total = products.length
    let perPage = 8;
    let maxPage = Math.ceil(total / perPage)

    let page = parseInt(req.query.page) || 1;

    //if page > maxPage set page = maxPage
    page = (page > maxPage) ? maxPage : page;

    let begin = (page - 1) * perPage;
    let end = page * perPage;

    //get total items = array.length
    //maxPage = Math.ceil(total/perPage)


    res.render('products/index', {
        products: products.slice(begin, end)
    })
}

//les 20 pagination
module.exports.index2Lowdb = function (req, res) {
    //methoad 1 : slice array

    // /products?page = 2
    // items per page x = 3
    // Page 1 : 0 1 2
    // Page 2 : 0 1 2
    // Page 1 : 0 1 2
    // Page 1 : 0 1 2


    //total : 9
    //get items in page n(1), widh x(3) items per page 
    //begin = (n-1) * x ( n=1, x=3, begin = 0)  ( n=2, x=3, begin = 3) 
    //end = (n-1)*x + x = n*x (n=1, x=3, end =3) ( n=2, x=3, begin = 6) 
    //items = array.slice(begin, end)
    const products = db.get('products').value()
    let total = products.length
    let perPage = 8;
    let maxPage = Math.ceil(total / perPage)

    let page = parseInt(req.query.page) || 1;

    //if page > maxPage set page = maxPage
    page = (page > maxPage) ? maxPage : page;

    let begin = (page - 1) * perPage;
    let end = page * perPage;

    //get total items = array.length
    //maxPage = Math.ceil(total/perPage)

    //medthod 2 
    //drop first (page-1)*perPage items

    //then take perPage items
    res.render('products/index', {
        products: db.get('products').drop((page - 1) * perPage).take(perPage).value()
    })
}

module.exports.indexPromise = function (req, res) {
    //2way callback or return promise
    Product.find().then(function (products) {
        res.render('products/index', {
            products: products
        })
    })
}

//use async await
module.exports.indexOld = async function (req, res) {
    //save a callback
    let products = await Product.find()

    res.render('products/index', {
        products: products
    })
}

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = (page - 1) ? (page - 1) * limit : 0;

    return { limit, offset };
};

//use async await +paginate
module.exports.index = async function (req, res) {

    //get query params

    const page = req.query.page || 1
    const size = req.query.size || 8


    const { limit, offset } = getPagination(page, size);


    //save a callback
    let data = await Product.paginate({}, { offset, limit })


    // docs: (8) [model, model, model, model, model, model, model, model]
    // hasNextPage: true
    // hasPrevPage: true
    // limit: 8
    // nextPage: 3
    // offset: 8
    // page: 2
    // pagingCounter: 9
    // prevPage: 1
    // totalDocs: 36
    // totalPages: 5
    res.render('products/index', {
        products: data.docs,
        totalItems: data.totalDocs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
        data: data


    })
}
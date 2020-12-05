const Product = require('../../models/product.model')

//use async await
module.exports.index = async function (req, res, next) {
    //save a callback
    //put all code in a try/catch
    try {
        let products = await Product.find()

        //make an error
        products.poo();
        //access to link http://localhost:3000/api/products 
        //spin infinite
        //c error


        // render JSON
        res.json(products);

        // res.render('products/index', {
        //     products: products
        // })

    } catch (error) {

        // next() - chuyen den middleware tiep theo
        //next(error) - chuyen den error handler
        //show loi tren browser
        //server khong bi treo
        next(error)
        // console.error(error)
    }

}
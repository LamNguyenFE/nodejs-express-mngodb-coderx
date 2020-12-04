const db = require('../db')

//les 20 pagination
module.exports.addToCart = function (req, res, next) {
    let productId = req.params.productId
    let sessionId = req.signedCookies.sessionId

    if (!sessionId) {
        res.redirect('products')
        return
    }
    //check product is already in cart
    //update instead add
    let count = db.get('sessions')
        .find({ id: sessionId })
        .get('cart.' + productId, 0)
        .value()


    db.get('sessions')
        .find({ id: sessionId })
        .set('cart.' + productId, count + 1)
        .write()

    res.redirect('/products')
}

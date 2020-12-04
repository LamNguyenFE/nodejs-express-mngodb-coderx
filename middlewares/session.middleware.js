const shortid = require('shortid')
const db = require('../db')
module.exports = function (req, res, next) {
    if (!req.signedCookies.sessionId) {
        //if not create new signed cookie
        let sessionId = shortid.generate()
        res.cookie('sessionId', sessionId, { signed: true })

        db.get('sessions').push({
            id: sessionId,
            cart: {}
        }).write()
    }

    let sessionId = req.signedCookies.sessionId

    let cart = db.get('sessions')
        .find({ id: sessionId })
        .get('cart')
        .value()


    // const object = { a: 1, b: 2, c: 3 };

    // for (const property in object) {
    //     console.log(`${property}: ${object[property]}`);
    // }
    let cartNumberItems = 0

    for (const property in cart) {
        cartNumberItems += cart[property]
        // console.log(`${property}: ${cart[property]}`);
        // console.log(cartNumberItems);
    }
    res.locals.cartNumberItems = cartNumberItems
    //next
    //if created next
    next()
}
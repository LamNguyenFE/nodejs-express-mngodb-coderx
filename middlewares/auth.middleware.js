const db = require('../db')
module.exports.requireAuth = function (req, res, next) {
    //check cookie duoc guui len ko
    //cookie chua thong tin dang nhap
    //dung signedCookies dam bao cookie khong bi sua doi, lam gia
    if (!req.signedCookies.userId) {
        res.redirect('/auth/login')
        return
    }

    let user = db.get('users').find({ id: req.signedCookies.userId }).value();

    if (!user) {
        res.redirect('/auth/login');
        return
    }
    //ton tai trong 1 vong doi request
    res.locals.user = user
    next()

}
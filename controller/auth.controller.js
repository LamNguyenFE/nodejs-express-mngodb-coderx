const db = require('../db')
const md5 = require('md5')

module.exports.login = (req, res) => {
    res.render('auth/login')
}

module.exports.postLogin = (req, res) => {
    //chua validate
    let email = req.body.email;
    let password = req.body.password;

    //check in lowdb
    let user = db.get('users').find({ email: email }).value();

    if (!user) {
        res.render('auth/login', {
            errors: [
                'User does not exits.'
            ],
            values: req.body
        })
        return
    }

    //if user exist
    let hashedPassword = md5(password)
    if (user.password !== hashedPassword) {
        res.render('auth/login', {
            errors: [
                'Wrong password.'
            ],
            values: req.body
        })
        return
    }
    //if ok
    res.cookie('userId', user.id, { signed: true })

    res.redirect('/users')
}

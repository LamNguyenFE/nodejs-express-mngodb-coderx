// module.exports = {
//     a: 1,
//     b: 2,
// }
// //equal
// module.exports.a = 1;
// module.exports.b = 2;
const db = require('../db')
const shortid = require('shortid')

module.exports.index = (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
}

module.exports.search = function (req, res) {
    // res.send(req.query)
    let q = req.query.q;
    let users = db.get('users').value();
    let matchedUsers = users.filter((user) => {
        return user.name.indexOf(q) !== -1;
    })

    res.render('users/index', {
        users: matchedUsers
    })
}

module.exports.create = (req, res) => {
    res.render('users/create')
}

module.exports.postCreate = (req, res) => {
    //save to array users
    console.log(req.body);
    //add id to req.body ( user )
    req.body.id = shortid.generate();

    //array of errors
    //libraris validate -> midleware
    let errors = [];
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
    db.get('users').push(req.body).write()
    //res.render('users/create')

    res.redirect('/users')
}

module.exports.get = (req, res) => {

    let id = req.params.id
    // console.log(typeof (id)) //string -> parseInt -> int

    let user = db.get('users').find({ id: id }).value()

    res.render('users/view', {
        user: user
    })


}
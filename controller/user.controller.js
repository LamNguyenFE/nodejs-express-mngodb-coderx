var csrf = require('csurf');
// module.exports = {
//     a: 1,
//     b: 2,
// }
// //equal
// module.exports.a = 1;
// module.exports.b = 2;
const bcrypt = require('bcryptjs')
const db = require('../db')
const User = require('../models/user.model')
const shortid = require('shortid')
const md5 = require('md5')

//Lowdb
// module.exports.index = (req, res) => {
//     res.render('users/index', {
//         users: db.get('users').value()
//     })
// }

//moong
module.exports.index = async function (req, res) {
    //save a callback
    let users = await User.find()

    res.render('users/index', {
        users: users
    })
}

//Lowdb
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
//Both //Lowdb and moong
module.exports.create = (req, res) => {
    // console.log(req.csrfToken())
    res.render('users/create', {
        csrfToken: req.csrfToken()
    })
}
//Lowdb
module.exports.postCreateLowdb = (req, res) => {
    //save to array users
    console.log(req.body);
    console.log(res.locals);
    //add id to req.body ( user )
    req.body.id = shortid.generate();
    //avatar
    // file
    // destination: "./public/uploads/"
    // encoding: "7bit"
    // fieldname: "avatar"
    // filename: "avatar-1606987495576"
    // mimetype: "image/png"
    // originalname: "img1.png"
    // path: "public\uploads\avatar-1606987495576"
    // size: 27350
    if (req.file) {
        req.body.avatar = 'uploads/' + req.file.filename
    }

    db.get('users').push(req.body).write()
    //res.render('users/create')

    res.redirect('/users')
}

module.exports.postCreate = async (req, res) => {
    //save to array users
    // console.log(req.body);
    // console.log(res.locals);
    //add id to req.body ( user )
    // req.body.id = shortid.generate();
    //avatar
    // file
    // destination: "./public/uploads/"
    // encoding: "7bit"
    // fieldname: "avatar"
    // filename: "avatar-1606987495576"
    // mimetype: "image/png"
    // originalname: "img1.png"
    // path: "public\uploads\avatar-1606987495576"
    // size: 27350
    if (req.file) {
        req.body.avatar = 'uploads/' + req.file.filename
    }

    //create model 
    // name: String,
    // email: String,
    // password: String,
    // phone: String,
    // avatar: String,
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        phone: req.body.phone,
        avatar: req.body.avatar
    });

    const creartedUsers = await user.save();

    // res.send({
    //     _id: creartedUsers._id,
    //     name: creartedUsers.name,
    //     email: creartedUsers.email,
    //     password: creartedUsers.password,
    //     phone: creartedUsers.phone,
    //     avatar: creartedUsers.avatar,

    // });

    // db.get('users').push(req.body).write()
    //res.render('users/create')

    res.redirect('/users')
}
//Lowdb
module.exports.getLowdb = (req, res) => {

    let id = req.params.id
    // console.log(typeof (id)) //string -> parseInt -> int

    let user = db.get('users').find({ id: id }).value()

    res.render('users/view', {
        user: user
    })


}
//mong
//view
module.exports.get = async (req, res, next) => {

    let _id = req.params.id
    // console.log(typeof (id)) //string -> parseInt -> int
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (user) {
            res.render('users/view', {
                user: user
            })
        } else {
            res.render('users/view', {
                errors: [
                    { message: 'User Not Found.' }
                ]
            })
        }
    } catch (error) {
        next(error)
    }

}

//Lowdb
module.exports.editLowdb = (req, res) => {
    let id = req.params.id
    // console.log(typeof (id)) //string -> parseInt -> int

    let user = db.get('users').find({ id: id }).value()

    res.render('users/edit', {
        user: user
    })
}

module.exports.edit = async (req, res, next) => {

    let _id = req.params.id
    // console.log(typeof (id)) //string -> parseInt -> int
    try {
        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            res.redirect('/users')
        }
        if (user.email == 'admin@coderx.com') {
            res.redirect('/users')
            return
        }


        if (user) {
            user.password = ''
            res.render('users/edit', {
                userEdit: user
            })
        } else {
            res.render('users/edit', {
                errors: [
                    { message: 'User Not Found.' }
                ]
            })
        }
    } catch (error) {
        next(error)
    }
}


//Lowbd
module.exports.postEditLowbd = (req, res) => {
    //save to array users
    console.log('params id- ', req.params.id)
    console.log('body-', req.body)
    console.log('file-', req.file)


    if (!req.file) {
        db.get('users').find({ id: req.params.id }).assign({
            name: req.body.name,
            phone: req.body.phone
        }).write()
    }
    else {
        db.get('users').find({ id: req.params.id }).assign({
            name: req.body.name,
            phone: req.body.phone,
            avatar: 'uploads/' + req.file.filename
        }).write()
    }
    res.redirect('/users')




    // console.log(res.locals);
    //avatar
    // file
    // destination: "./public/uploads/"
    // encoding: "7bit"
    // fieldname: "avatar"
    // filename: "avatar-1606987495576"
    // mimetype: "image/png"
    // originalname: "img1.png"
    // path: "public\uploads\avatar-1606987495576"
    // size: 27350

}

module.exports.postEdit = async (req, res, next) => {
    //save to array users
    console.log('params id- ', req.params.id)
    console.log('body-', req.body)
    console.log('file-', req.file)

    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.phone = req.body.phone || user.phone;

        user.avatar = req.file && ('uploads/' + req.file.filename) || user.avatar;

        const updatedUser = await user.save();
        if (updatedUser) {
            updatedUser.password = ''
            res.render('users/edit', {
                userEdit: updatedUser,
                messages: [
                    'User Updated'
                ]
            })
        }

        //res.send({ message: 'User Updated', user: updatedUser });
    } else {

        res.render('users/edit', {
            user: {},
            errors: ['User Not Found']
        })
    }

    // res.redirect('/users', )




    // console.log(res.locals);
    //avatar
    // file
    // destination: "./public/uploads/"
    // encoding: "7bit"
    // fieldname: "avatar"
    // filename: "avatar-1606987495576"
    // mimetype: "image/png"
    // originalname: "img1.png"
    // path: "public\uploads\avatar-1606987495576"
    // size: 27350

}

//delete
//Lowdb
module.exports.deleteLowdb = (req, res) => {
    let id = req.params.id
    //don't delete admin :D
    if (id === 'F3kAnldw1') {
        res.redirect('/users')
        return
    }
    // console.log(typeof (id)) //string -> parseInt -> int

    let user = db.get('users').find({ id: id }).value()
    if (user) {
        db.get('users')
            .remove({ id: id })
            .write()
    }

    res.redirect('/users')
}

//mong
module.exports.delete = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        //prevent deleting admin self
        if (user.email === 'admin@coderx.com') {
            let users = await User.find()
            res.render('users/index', {
                users: users,
                messages: [
                    'Can Not Delete Admin User'
                ]
            })

            return;
        }

        const deleteUser = await user.remove();
        let users = await User.find()
        res.render('users/index', {
            users: users,
            messages: [
                'Deleted ' + deleteUser.name
            ]
        })

    } else {
        let users = await User.find()
        res.render('users/index', {
            users: users,
            messages: [
                'User Not Found '
            ]
        })
    }
}
module.exports.validate = function (req, res, next) {
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
        });
        return;
    }
    //res.locals luu bien muon gui cho middleware sau
    res.locals.sucssess = true
    //quen next se goi infinite
    next();
};

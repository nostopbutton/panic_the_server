var paniclib = require('../lib/paniclib');

module.exports = {
    getIndex: function(req, res) {
        res.render('index');
    },

    getUser: function(req, res) {
        paniclib.getUser(req.params.username, function(err, user) {
            if (user) {
                res.send('1');
            } else {
                res.send('0');
            }
        });
    },

    signup: function(req, res) {
        paniclib.createUser(req.body.username
            , req.body.email
            , req.body.password, function(err, user) {
                console.log(user);
                res.redirect('/design');
            });
    },

    login: function(req, res) {
        paniclib.authenticate(req.body.username
            , req.body.password, function(err, id) {
                if (id) {
                    req.session._id = id;
                    req.session.username = req.body.username;
                    res.redirect('/design');
                }
                else
                // TODO - add user friendly error page
                    res.redirect('/');
            });
    },

    design: function(req, res) {
        res.render('design');
    }

}
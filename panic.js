/*jslint node: true */
'use strict';

var db = require('./lib/db')
  , express = require('express')
  , paniclib = require('./lib/paniclib')
  , panicroutes = require('./routes/panicroutes.js');

var app = express.createServer();

app.configure(function () {
    // Configure express to parse form requests
    app.use(express.bodyParser());
    // Configure express to support cookies
    app.use(express.cookieParser());
    // Configure express to support sessions
    app.use(express.session({secret: 'secretpasswordforsessions', store: paniclib.getSessionStore()}));
    // Define the template directory
    app.set('views', __dirname + '/views');
    // Define EJS (Embedded JavaScript) as the template engine.
    app.set('view engine', 'ejs');
    // Express.static is used to indicate the directory where we’ll store static files such as stylesheets and images
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
    // Vebose error handling for development
    app.use(express.errorHandler({dumpExceptions:true, showStack:true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

// By specifying layout: false, we indicate that no default layout is being used as a template
app.set('view options', {
    layout: false
});

app.get ('/',           panicroutes.getIndex);
app.post('/signup',     panicroutes.signup);
app.post('/login',      panicroutes.login);
app.get ('/design',     paniclib.ensureAuthenticated, panicroutes.design);


app.get ('/api/user/:username', panicroutes.getUser);

// To provide a user friendly 404 Not found msg
// Essentially, this provides a catchall, handling any request not processed by prior routes
app.use(function(req, res){
    res.render('404');
});


db.open(function() {
    paniclib.createSocket(app);
    var port = process.env.PORT || 3000;
    app.listen(port);
});
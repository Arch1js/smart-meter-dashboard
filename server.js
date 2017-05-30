var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var flash    = require('connect-flash');
var http = require('http').Server(app);

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var express = require('express'),
  env = process.env.NODE_ENV || 'development';

// var forceSsl = function (req, res, next) { //enable for ssl on heroku
//    if (req.headers['x-forwarded-proto'] !== 'https') {
//        return res.redirect(['https://', req.get('Host'), req.url].join(''));
//    }
//    return next();
// };
//
// app.use(forceSsl);
// configuration ===============================================================

var oneDay = 86400000;

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser()); // get information from html forms
app.use(express.static(__dirname + '/views',{ maxAge: oneDay }));

// routes ======================================================================
require('./app/routes.js')(app);
// launch ======================================================================
http.listen(port);
console.log('The magic happens on port ' + port);

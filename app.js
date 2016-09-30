var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stormpath = require('express-stormpath');
var methodOverride = require('method-override')
var routes = require('./routes/index');
var dashboard = require('./routes/dashboard');
var api = require('./routes/api');
//var events = require('./routes/events');
var users = require('./routes/users');
var port = process.env.PORT||80;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(stormpath.init(app, {
  apiKey: {
    id: '4S2IAJL6JW7Q0Q0RI53ZFS6MZ',
    secret: 'Rel3I3HG+OTwy3IJkELu72DJZMJ2fK+BUEBcSdsrkaM'
  },
  application: {
    href: `https://api.stormpath.com/v1/applications/34LCPdxCuZvZ896UP9kAQO`
  },
  web: {
    login:{
      enabled: true,
      nextUri: '/dashboard'
    }
  }
}));
app.use('/', routes);
app.use('/dashboard', dashboard);
app.use('/api',api);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(port)
app.on('stormpath.ready',function(){
  console.log('Estamos corriendo...!')
})
module.exports = app;

var express = require('express');
var proxy = require('http-proxy-middleware');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var join = require('path').join;
var autoRoute = require('./autoroute');
var config = require('./config');
var axios = require('axios');
var log4js = require('log4js');
var app = express();


// add proxy request
for (let key in config.proxy) {
  app.use(key, proxy(config.proxy[key]));
}

// view engine setup
app.set('views', path.join(__dirname, 'dist/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

log4js.configure(config.log4js);
app.use(log4js.connectLogger(log4js.getLogger('app'), {
  level: 'auto'
}));


let getServerAdress = () => {
  for (let key in config.proxy) {
    return config.proxy[key].target;
  }
};

// 每次在进入路由前装入全局变量locals中
app.use(function (req, res, next) {
  res.locals.resUrl = config.resUrl;
  res.locals.clientId = config.clientId;
  res.locals.a4Server = config.a4Server;
  res.locals.creditServer = config.creditServer;
  next();
});

// auto scan to express.Router
autoRoute.load(app, join(__dirname, '/routes')); // 扫描路由到工具

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
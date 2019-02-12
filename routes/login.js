'use strict';
const http = require('../utils/httpUtils');
const dataUtils = require('../public/lib/dataUtils');
const namespace = require('./namespace');
module.exports = function (app) {

  app.get(`${namespace.root}/login`, async function (req, res) {
    
    res.header('Location', 'http://localhost:7000/panel');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.render('login', {

    });
  });
};
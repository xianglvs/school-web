'use strict';
const http = require('../../utils/httpUtils');
const dataUtils = require('../../public/lib/dataUtils');
const namespace = require('../namespace');
module.exports = function (app) {

  app.get(`${namespace.root}/user`, async function (req, res) {
      res.render('sys/user', {
      });
  });
};
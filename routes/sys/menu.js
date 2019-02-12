'use strict';
const http = require('../../utils/httpUtils');
const dataUtils = require('../../public/lib/dataUtils');
const namespace = require('../namespace');
module.exports = function (app) {

  app.get(`${namespace.root}/menu`, async function (req, res) {
    let menuJson = await http.get(`/api/sysMenu`, {},'/antique').catch(e => {
      res.send({
        errCode: 401
      });
    });
    res.render('sys/menu', {
      menuJson:JSON.stringify(menuJson.data)
    });
  });
};
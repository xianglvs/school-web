'use strict';
const http = require('../../utils/httpUtils');
const dataUtils = require('../../public/lib/dataUtils');
const namespace = require('../namespace');
module.exports = function (app) {

  app.get(`${namespace.root}/role`, async function (req, res) {
      let menuJson = await http.get(`/api/sysMenu`, {},'/antique').catch(e => {
          res.send({
              errCode: 401
          });
      });
      res.render('sys/role', {
          menuJson:JSON.stringify(menuJson.data)
      });
  });
};
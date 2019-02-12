'use strict';
const http = require('../utils/httpUtils');
const dataUtils = require('../public/lib/dataUtils');
const namespace = require('./namespace');
module.exports = function (app) {

  app.get(`${namespace.root}`, async function (req, res) {
    res.render('panel', {
      skinCss:req.cookies.skinCss
    });
  });

  app.post(`${namespace.root}/signout`, async function (req, res) {
    
    let data = await http.delete('/auth/signout/' + req.body.sessionCode, {},'/4a').catch(e => {
      res.send({
        errCode: 401
      });
    });

    res.send(data);
  });
};
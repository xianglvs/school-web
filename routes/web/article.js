'use strict';
const http = require('../../utils/httpUtils');
const namespace = require('../namespace');
module.exports = function (app) {

  app.get(`${namespace.root}/article`, async function (req, res) {
      let result = await http.get(`/api/article/list`, {
      }).catch(e => {
        res.send({
          errCode: 401
        });
      });
     res.render('web/article', {
        newsList:JSON.stringify(result.data.list||[])
     });
  });
};
'use strict';
const http = require('../../utils/httpUtils');
const namespace = require('../namespace');
module.exports = function (app) {

  app.get(`${namespace.root}/`, async function (req, res) {
      let result = await http.get(`/api/article/list`, {pageSize:10
      }).catch(e => {
        res.send({
          errCode: 401
        });
      });
     res.render('web/article', {
        newsList:JSON.stringify(result.data.list||[])
     });
  });

 app.get(`${namespace.root}/article/detail`, async function (req, res) {
      let result = await http.get(`/api/article/`+req.query.id, {
      }).catch(e => {
        res.send({
          errCode: 401
        });
      });
     res.render('web/articleDetail', {
       newsDetail:result.data
     });
 });
  

};
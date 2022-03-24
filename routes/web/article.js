'use strict';
const http = require('../../utils/httpUtils');
const namespace = require('../namespace');
module.exports = function (app) {

    app.get(`${namespace.root}/`, async function (req, res) {
        try {
            let [list, index] = await Promise.all([http.get(`/api/article/list`, {
                pageSize: 10
            }), http.get(`/api/home`, {})]);
            res.render('web/article', {
                newsList: JSON.stringify(list.data.list || []),
                home: index.data
            });
        } catch (e) {
            res.send({
                errCode: 401
            });
        }
    });

    app.get(`${namespace.root}/article/detail`, async function (req, res) {
        try {
            let [result, index] = await Promise.all([http.get(`/api/article/` + req.query.id, {}), http.get(`/api/home`, {})]);
            res.render('web/articleDetail', {
                newsDetail: result.data,
                home: index.data
            });
        } catch (e) {
            res.send({
                errCode: 401
            });
        }
    });

    app.get(`${namespace.root}/article/preview`, async function (req, res) {
        try {
            let [result, index] = await Promise.all([http.get(`/api/article/preview/` + req.query.key, {}), http.get(`/api/home`, {})]);
            if (result.code != 0) {
                res.render('error', {
                    message: "预览页面已失效",
                    error: {}
                });
                return;
            }
            res.render('web/articleDetail', {
                newsDetail: result.data,
                home: index.data,
                preview : true
            });
        } catch (e) {
            res.send({
                errCode: 401
            });
        }
    });


};

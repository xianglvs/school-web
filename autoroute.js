'use strict';

const fs = require('fs');
const console = require('log4js').getLogger('autoroute');
/**
 * 自动载入载入路由
 */
let AutoRouter = function () {
    let path = null;
    let express = null;
    let routes = {}; // 所有路由列表

    /**
     * express对象代理,用于延时加载路由地址
     */
    let ExpressProxy = function () {
        this.all = function (path, ...requestHandler) {
            routes[path] = {};
            routes[path].method = 'all';
            routes[path].requestHandler = requestHandler;
        };
        this.use = function (path, ...requestHandler) {
            routes[path] = {};
            routes[path].method = 'use';
            routes[path].requestHandler = requestHandler;
        };
        this.get = function (path, ...requestHandler) {
            routes[path] = {};
            routes[path].method = 'get';
            routes[path].requestHandler = requestHandler;
        };
        this.post = function (path, ...requestHandler) {
            routes[path] = {};
            routes[path].method = 'post';
            routes[path].requestHandler = requestHandler;
        };
        this.delete = function (path, ...requestHandler) {
            routes[path] = {};
            routes[path].method = 'delete';
            routes[path].requestHandler = requestHandler;
        };
        this.put = function (path, ...requestHandler) {
            routes[path] = {};
            routes[path].method = 'put';
            routes[path].requestHandler = requestHandler;
        };
    };
    ExpressProxy.prototype = express;
    let expressProxy = new ExpressProxy();
    let scan = function (action) {
        action = action || path;
        fs.readdirSync(action)
            .forEach((file) => {
                if (fs.statSync(action + '/' + file).isDirectory()) {
                    scan(action + '/' + file);
                    return;
                }
                // 不是js文件直接跳过
                if (!file.endsWith('.js')) {
                    return;
                }
                var controller = require(action + '/' + file);
                if (Object.prototype.toString.call(controller) === '[object Function]') {
                    controller(expressProxy);
                }
            });
    };

    /**
     * 扫描路由
     * @param{express} app
     * @param{string} filePath 要扫描文件路径
     */
    this.load = function (app, ...filePath) {
        express = app;
        if (!filePath || filePath.length === 0) {
            throw new Error('The filePath cannot be empty');
        }
        console.info('loadding routes start...');
        for (let i = 0; i < filePath.length; i++) {
            path = filePath[i];
            scan();
        }
        for (let n in routes) {
            express[routes[n].method](n, routes[n].requestHandler);
        }
        console.info('loadding routes end...');
    };

    /**
     * 得到所有载入的路由
     * @param{function} filter 过滤回调,参数routeList,return routeList
     */
    this.getRoutes = function () {
        return routes;
    };

    /**
     * 设置路由
     * @param {*} targetRoutes 目标路由
     */
    this.setRoutes = function (targetRoutes) {
        routes = targetRoutes;
    };

};

module.exports = new AutoRouter();
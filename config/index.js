'use strict';

/**
 * 首先加入需要依赖的模块
 */
const path = require('path');                                 // 读取系统路径模块
const development = require('./development');             // 开发模式环境
const production = require('./production');               // 生产模式环境
const defaults = {                                              // 默认对象
  root: path.join(__dirname, '..'),                             // 项目根目录地址
};

/**
 * Expose
 */

module.exports = {
  development: Object.assign(development, defaults),
  production: Object.assign(production, defaults)
}[process.env.NODE_ENV || 'development'];
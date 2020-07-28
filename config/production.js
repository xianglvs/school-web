'use strict';

/**
 * Expose
 */

module.exports = {
  log4js: { // 日志相关配置
    appenders: [{
      'type': 'console'
    }, {
      'type': 'dateFile',
      'filename': 'logs/access.log',
      'pattern': '-yyyy-MM-dd',
      'alwaysIncludePattern': true,
      'category': 'http'
    }, {
      'type': 'file',
      'filename': 'logs/logs.log',
      'maxLogSize': 10485760,
      'numBackups': 10
    }, {
      'type': 'dateFile',
      'filename': 'logs/date.log',
      'pattern': '-yyyy-MM-dd',
      'alwaysIncludePattern': true
    }, {
      'type': 'logLevelFilter',
      'level': 'error',
      'appender': {
        'type': 'file',
        'filename': 'logs/errors.log'
      }
    }],
    'replaceConsole': true
  },
  server: {
    port: 80 // 项目监听端口
  },
  less: {
    globalVars: {
      resUrl: '~""' // 图片访问路径,空白表示项目相对地址
    }
  },
  resUrl: '', // 当前项目访问路径,空白表示项目相对地址
  proxy: {
    '/web': { // 后端接口服务器
      target: 'http://120.78.133.215:9998', // 要代理的地址
      pathRewrite: { // 拦截到的地址重写为
        '^/web': '/'
      },
      changeOrigin: true
    }
  }
};
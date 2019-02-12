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
      imageUrl: '~""' // 图片访问路径,空白表示项目相对地址
    }
  },
  resUrl: '', // 当前项目访问路径,空白表示项目相对地址
  proxy: {
    '/antique': { // 要拦截的地址
      target: 'http://47.96.2.236:9000/service-manage-api', // 要代理的地址
      pathRewrite: { // 拦截到的地址重写为
        '^/antique': '/'
      },
      changeOrigin: true
    },
    '/antUpload': { // 要拦截的地址
        target: 'http://47.96.2.236:9015', // 要代理的地址
        pathRewrite: { // 拦截到的地址重写为
            '^/antUpload': '/'
        },
        changeOrigin: true
    }
  }
};
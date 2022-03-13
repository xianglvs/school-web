'use strict';

module.exports = {
  log4js: { // 日志配置
    appenders: [{
      'type': 'console'
    }],
    'replaceConsole': true
  },
  server: {
    port: 8888, // 项目监听端口
    browserSyncPort: 7000
  },
  less: {
    globalVars: {
      resUrl: '~""' // 图片访问路径,空白表示项目相对地址
    }
  },
  resUrl: '', // 当前项目访问路径,空白表示项目相对地址
  proxy: {
    '/web': { // 后端接口服务器
      target: 'http://127.0.0.1:9998/', // 要代理的地址
      pathRewrite: { // 拦截到的地址重写为
        '^/web': '/'
      },
      changeOrigin: true
    },
    '/admin': { // 图片服务器
      target: 'http://120.78.133.215/admin', // 要代理的地址
      pathRewrite: { // 拦截到的地址重写为
        '^/admin': '/'
      },
      changeOrigin: true
    }
  }
};

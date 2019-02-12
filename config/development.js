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
    '/interface': { // 后端接口服务器
      target: 'http://47.96.2.236:9000/service-manage-api', // 要代理的地址
      pathRewrite: { // 拦截到的地址重写为
        '^/interface': '/'
      },
      changeOrigin: true
    },
    '/upload': { // 图片上传服务器
      target: 'http://47.96.2.236:9015', // 要代理的地址
      pathRewrite: { // 拦截到的地址重写为
        '^/upload': '/'
      },
      changeOrigin: true
    }
  }
};
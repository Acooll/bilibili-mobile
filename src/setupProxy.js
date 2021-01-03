const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/live',
    createProxyMiddleware({
      target: 'https://api.live.bilibili.com',
      changeOrigin: true,
      ws:true,
      pathRewrite:{
        '^/live':''
      }
    }),
  );
  app.use(
    '/local',
    createProxyMiddleware({
      target: 'http://localhost:3011',
      changeOrigin: true,
      ws:true,
      pathRewrite:{
        '^/local':''
      }
    }),
  )
};
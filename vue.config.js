const proxy = require('http-proxy-middleware');

module.exports = {
  runtimeCompiler: true,
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'pro' || process.env.NODE_ENV === 'pre' || process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  // devServer: {
  //   host: '127.0.0.1',//target host
  //   port: 8080,
  //   open: false,
  //   //proxy:{'/api':{}},代理器中设置/api,项目中请求路径为/api的替换为target
  //   proxy: {
  //     '/api': {
  //       target: 'http://43.247.90.115:8080',//代理地址，这里设置的地址会代替axios中设置的baseURL
  //       changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
  //       //ws: true, // proxy websockets
  //       //pathRewrite方法重写url
  //       // pathRewrite: {
  //       //   '^/api': '/'
  //       //   //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
  //       //   //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
  //       // }
  //     }
  //   }
  // },
}
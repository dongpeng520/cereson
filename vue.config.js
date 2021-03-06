const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  publicPath: '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        // path.resolve(__dirname, 'src/styles/_variables.scss'), // 解决开发环境构建速度慢
        // path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  configureWebpack: config => {
    if (isProduction) {
      config.devtool = false;
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }));
    }
  },
  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('source-map') // 解决浏览器debugger源码查找
      );
  },
  devServer: {
    // host: "127.0.0.1",
    port: 8080,
    proxy: {
      '/login': {
        target: 'http://127.0.0.1'
      }
    }
  }
};

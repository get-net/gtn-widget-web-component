// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
module.exports = {
  css: {
    extract: false
  },
  runtimeCompiler: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          loader: 'babel-loader',
          exclude: /(node_modules)/
        },
      ],
    }
  }
  
}
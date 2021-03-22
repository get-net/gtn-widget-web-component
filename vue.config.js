var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()],
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          loader: 'babel-loader',
        },
      ],
    }
  }
  
}
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const pkg = require('../package.json');

const banner = `tinyjs-plugin-smartscale
Description:Tinyjs 智能屏幕适配
Author: ${pkg.author}
Version: v${pkg.version}
Github: https://github.com/qingyangmoke/tinyjs-plugin-smartscale.git`
;

const config = {
  entry: {
    'SmartScale': [path.resolve(__dirname, '../src/index.js')]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: path.resolve(__dirname, '../dist'),
    filename: 'index.debug.js',
    libraryTarget: 'umd',
    library: ['Tiny', '[name]'],
  },
  plugins: [
    new webpack.BannerPlugin(banner),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
    // noParse: /src\/p2\/p2.js/
  },
};

module.exports = config;

const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  cache: true,

  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  },

  entry: [
    'webpack-dev-server/client?http://localhost:3333',
    './src/index'
  ],

  output: {
    path: path.join(__dirname, 'lib/umd/plugins/mention'),
    filename: 'plugin.js',
    publicPath: '/static/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve('./src')
    ],
    modulesDirectories: [
      'node_modules'
    ]
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    }]
  }
};

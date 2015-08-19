var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  cache: true,

  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  },

  entry: './src/index',

  output: {
    path: path.join(__dirname, 'lib/umd/plugins/mention'),
    filename: 'plugin.js',
    publicPath: '/static/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      '__PLUGIN_DEV__': true
    })
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

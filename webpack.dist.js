var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config');

config.devtool = false;
config.entry = './src/index';

config.output = {
  path: path.resolve(__dirname, 'lib/umd/plugins/mention'),
  filename: 'react-tinymce-mention.min.js',
  libraryTarget: 'umd',
  library: 'reactMentions',
  publicPath: '/static/'
};

config.externals = {
  react: 'React',
  axios: 'axios',
  'react-tinymce': 'react-tinymce '
};

config.plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({ minimize: true })
];

module.exports = config;

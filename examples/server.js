var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var simple = require('./webpack.simple');
var advanced = require('./webpack.advanced');
var argv = require('yargs').argv;

var config = argv.simple ? simple : advanced;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});

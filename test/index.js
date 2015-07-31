var Server = require('karma').Server;
var path = require('path');

var server = new Server({
  configFile: path.join(__dirname, '/karma.config.js'),
  autoWatch: true,
  singleRun: false
});

server.start();

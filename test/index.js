var karma = require('karma').server;
var path = require('path');

karma.start({
  configFile: path.join(__dirname, '/karma.config.js'),
  autoWatch: true,
  singleRun: false
});

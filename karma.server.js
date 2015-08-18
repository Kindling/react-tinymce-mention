var Server = require('karma').Server
var path = require('path')
var argv = require('yargs').argv

var server = new Server({
  configFile: path.join(__dirname, '/karma.config.js'),
  autoWatch: true,
  singleRun: argv['single-run'] || false
})

server.start()

const Server = require('karma').Server;
const path = require('path');
const argv = require('yargs').argv;

const server = new Server({
  configFile: path.join(__dirname, '/karma.config.js'),
  autoWatch: true,
  singleRun: argv['single-run'] || false
});

server.start();

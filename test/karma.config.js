var path = require('path');

module.exports = function (config) {

  config.set({

    browserNoActivityTimeout: 50000,
    browsers: ['Chrome'],

    client: {
      captureConsole: true
    },

    frameworks: [
      'jasmine',
      'jasmine-matchers'
    ],

    reporters: ['progress', 'beep'],

    files: [

      { pattern: 'vendor/es5-shim.min.js', watched: false, served: true, included: true },
      { pattern: 'vendor/es5-sham.min.js', watched: false, served: true, included: true },
      { pattern: 'vendor/jasmine-matchers.js', watched: false, served: true, included: true },
      { pattern: 'vendor/sinon-1.12.2.js', watched: false, served: true, included: true },
      { pattern: 'vendor/modernizr.js', watched: false, served: true, included: true },
      { pattern: 'vendor/matchers.js', watched: false, served: true, included: true },

      // Main sources
      { pattern: 'unit.webpack.loader.js', watched: true }
    ],

    preprocessors: {
      'unit.webpack.loader.js': [
        'webpack',
        'sourcemap'
      ]
    },

    webpack: {
      cache: true,
      watch: true,
      devtool: 'eval',

      resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: [
          path.resolve(__dirname, '../src'),
          'node_modules'
        ]
      },

      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader'
          }
        ]
      }
    },

    webpackServer: {
      noInfo: true
    }
  });
};

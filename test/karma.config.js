var path = require('path');

module.exports = function (config) {

  config.set({

    basePath: process.cwd(),
    browserNoActivityTimeout: 50000,
    browsers: ['PhantomJS'],
    // browsers: ['Chrome'],

    client: {
      captureConsole: true
    },

    frameworks: [
      'jasmine',
      'jasmine-matchers'
    ],

    reporters: ['progress', 'beep'],

    files: [

      { pattern: 'test/vendor/jquery-2.1.4.js', watched: false, served: true, included: true },
      { pattern: 'public/scripts/vendor/tinymce/skins/kindling/*.{css,svg,woff,ttf}', watched: false, served: true, included: true },
      { pattern: 'public/scripts/vendor/tinymce/tinymce.full.js', watched: false, served: true, included: true },
      { pattern: 'test/vendor/es5-shim.min.js', watched: false, served: true, included: true },
      { pattern: 'test/vendor/es5-sham.min.js', watched: false, served: true, included: true },
      { pattern: 'test/vendor/jasmine-matchers.js', watched: false, served: true, included: true },
      { pattern: 'test/vendor/sinon-1.12.2.js', watched: false, served: true, included: true },
      { pattern: 'test/vendor/modernizr.js', watched: false, served: true, included: true },
      { pattern: 'test/vendor/matchers.js', watched: false, served: true, included: true },

      // Main sources
      { pattern: 'test/unit.webpack.loader.js', watched: true }
    ],

    preprocessors: {
      'test/unit.webpack.loader.js': [
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
            loader: 'babel-loader',
            exclude: /node_modules/
          }
        ]
      }
    },

    webpackServer: {
      noInfo: true
    }
  });
};

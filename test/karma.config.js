module.exports = function (config) {

  config.set({
    basePath: process.cwd(),
    browsers: ['PhantomJS'],

    frameworks: [
      'jasmine',
      'jasmine-matchers'
    ],

    reporters: ['progress', 'beep'],

    files: [
      'examples/shared/scripts/vendor/tinymce/tinymce.full.js',
      'test/tests.webpack.js'
    ],

    preprocessors: {
      'test/tests.webpack.js': [
        'webpack',
        'sourcemap'
      ]
    },

    webpack: {
      devtool: 'inline-source-map',

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

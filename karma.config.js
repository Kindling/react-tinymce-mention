module.exports = function (config) {

  config.set({
    browsers: ['PhantomJS'],

    frameworks: [
      'jasmine',
      'jasmine-matchers'
    ],

    reporters: ['progress', 'beep'],

    files: [
      'examples/shared/scripts/vendor/tinymce/tinymce.full.js',
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': [
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
  })
}

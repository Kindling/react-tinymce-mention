module.exports = function (config) {

  config.set({
    browsers: ['PhantomJS'],
    // browsers: ['Chrome'],

    frameworks: [
      'jasmine',
      'jasmine-matchers'
    ],

    reporters: ['progress', 'beep'],

    files: [
      'https://code.jquery.com/jquery-2.1.4.js',
      'examples/shared/scripts/vendor/tinymce/skins/kinding/skin.min.css',
      'examples/shared/scripts/vendor/tinymce/skins/kinding/content.min.css',
      'examples/shared/scripts/vendor/tinymce/tinymce.full.js',
      'karma.tests.webpack.js'
    ],

    preprocessors: {
      'karma.tests.webpack.js': [
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

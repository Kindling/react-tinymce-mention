'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTinymce = require('react-tinymce');

var _reactTinymce2 = _interopRequireDefault(_reactTinymce);

var _Mention = require('./Mention');

var _Mention2 = _interopRequireDefault(_Mention);

var _componentsCustomList = require('./components/CustomList');

var _componentsCustomList2 = _interopRequireDefault(_componentsCustomList);

var _testDataSource = require('./test-data-source');

var _testDataSource2 = _interopRequireDefault(_testDataSource);

var plugins = ['autolink', 'autoresize', 'code', 'image', 'link', 'media', 'mention', 'tabfocus'];

_react2['default'].render(_react2['default'].createElement(
  'div',
  null,
  _react2['default'].createElement(_reactTinymce2['default'], {
    content: '',
    config: {
      browser_spellcheck: true,
      document_base_url: window.location.origin + '/',

      // TODO
      forced_root_block: '',

      extended_valid_elements: 'blockquote[dir|style|cite|class|dir<ltr?rtl],iframe[src|frameborder|style|scrolling|class|width|height|name|align],pre',
      ie7_compat: false,
      image_description: false,
      image_dimensions: false,
      media_alt_source: false,
      media_poster: false,
      media_dimensions: false,
      menubar: false,
      plugins: plugins.join(','),

      // We always want the _full URL_ - not the relative path.
      relative_urls: false,
      remove_script_host: false,
      skin: 'kindling',
      statusbar: false,

      // Suppress the target option for links.
      target_list: false,
      theme: 'kindling',
      toolbar: 'bold italic underline strikethrough | bullist numlist blockquote | link unlink | image media | removeformat code'
    }
  }),
  _react2['default'].createElement(_Mention2['default'], {
    dataSource: _testDataSource2['default'],
    delimiter: '@',

    transformFn: function (dataSource) {
      var complexDataSource = dataSource.map(function (result) {
        var fullName = result.fullName;

        return {
          searchKey: fullName,
          displayLabel: fullName
        };
      });

      return complexDataSource;
    },

    onAdd: function (_ref) {
      var mentions = _ref.mentions;
      var changed = _ref.changed;

      console.log('ADDED: ', mentions, 'changed: ', changed);
    },

    onRemove: function (_ref2) {
      var mentions = _ref2.mentions;
      var changed = _ref2.changed;

      console.log('REMOVED: ', mentions, 'changed: ', changed);
    },

    customRenderer: function (_ref3) {
      var highlightIndex = _ref3.highlightIndex;
      var matchedSources = _ref3.matchedSources;
      var clickFn = _ref3.clickFn;

      return _react2['default'].createElement(_componentsCustomList2['default'], {
        highlightIndex: highlightIndex,
        matchedSources: matchedSources,
        onClick: clickFn
      });
    }
  })
), document.getElementById('root'));
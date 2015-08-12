'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTinymce = require('react-tinymce');

var _reactTinymce2 = _interopRequireDefault(_reactTinymce);

var _mentionMention = require('./mention/Mention');

var _mentionMention2 = _interopRequireDefault(_mentionMention);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _mentionComponentsCustomList = require('./mention/components/CustomList');

var _mentionComponentsCustomList2 = _interopRequireDefault(_mentionComponentsCustomList);

exports['default'] = _mentionMention2['default'];

var plugins = ['autolink', 'autoresize', 'code', 'image', 'link', 'media', 'mention', 'tabfocus'];

_react2['default'].render(_react2['default'].createElement(
  'div',
  null,
  _react2['default'].createElement(_reactTinymce2['default'], {
    content: '',
    config: {
      browser_spellcheck: true,
      document_base_url: window.location.origin + '/',
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
  _react2['default'].createElement(_mentionMention2['default'], {
    dataSource: _axios2['default'].get('http://localhost:3000/examples/shared/api/data.json'),
    delimiter: '@',
    transformFn: function (dataSource) {
      return dataSource.sort().reverse();
    },
    onAdd: function (mention) {
      console.log(mention, ' added');
    },
    customRenderer: function (_ref) {
      var highlightIndex = _ref.highlightIndex;
      var matchedSources = _ref.matchedSources;
      var clickFn = _ref.clickFn;

      return _react2['default'].createElement(_mentionComponentsCustomList2['default'], {
        highlightIndex: highlightIndex,
        matchedSources: matchedSources,
        onClick: clickFn
      });
    }
  })
), document.getElementById('root'));
module.exports = exports['default'];
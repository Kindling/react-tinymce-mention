'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTinymce = require('react-tinymce');

var _reactTinymce2 = _interopRequireDefault(_reactTinymce);

var _Mention = require('./Mention');

var _Mention2 = _interopRequireDefault(_Mention);

var _testDataSource = require('./test-data-source');

var _testDataSource2 = _interopRequireDefault(_testDataSource);

var plugins = ['autolink', 'autoresize', 'code', 'image', 'link', 'media', 'mention', 'tabfocus'];

var initialContent = 'Sed ut perspiciatis unde omnis\niste natus error sit voluptatem accusantium doloremque\n\nlaudantium, totam rem aperiam, eaque ipsa quae ab illo\n<br /><br />\n<br />\n\n\ninventore veritatis et quasi architecto beatae\nvitae dicta sunt explicabo. Nemo enim ipsam voluptatem\nquia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni\ndolores eos qui ratione voluptatem sequi nesciunt.\n<br />\n<br />\n\nFugiat quo voluptas nulla pariatur?';

initialContent = '';

_react2['default'].render(_react2['default'].createElement(
  'div',
  null,
  _react2['default'].createElement(_reactTinymce2['default'], {
    content: initialContent,
    config: {
      extended_valid_elements: 'blockquote[dir|style|cite|class|dir<ltr?rtl],iframe[src|frameborder|style|scrolling|class|width|height|name|align],pre',
      menubar: false,
      plugins: plugins.join(','),
      skin: 'kindling',
      statusbar: false,
      theme: 'kindling',
      toolbar: 'bold italic underline strikethrough | bullist numlist blockquote | link unlink | image media | removeformat code'
    }
  }),
  _react2['default'].createElement(_Mention2['default'], {
    delimiter: '@',
    showDebugger: true,
    transformFn: transformDataSource,
    _dataSource: _testDataSource2['default'],
    dataSource: [{
      fullName: 'chris'
    }, {
      fullName: 'david'
    }, {
      fullName: 'jim'
    }, {
      fullName: 'garrett'
    }],
    customRTEMention: function (props) {
      var tinymceId = props.tinymceId;
      var delimiter = props.delimiter;
      var displayLabel = props.displayLabel;

      return _react2['default'].createElement(
        'span',
        null,
        _react2['default'].createElement(
          'a',
          { href: '#', id: tinymceId, className: 'tinymce-mention' },
          delimiter,
          displayLabel
        ),
        ' '
      );
    },
    onAdd: function (_ref) {
      var mentions = _ref.mentions;
      var changed = _ref.changed;
      return console.log('Added', mentions, changed);
    },
    onRemove: function (_ref2) {
      var mentions = _ref2.mentions;
      var changed = _ref2.changed;
      return console.log('Removed', mentions, changed);
    }
  })
), document.getElementById('mentions'));

function transformDataSource(dataSource) {
  var complexDataSource = dataSource.map(function (result) {
    var fullName = result.fullName;

    return {
      searchKey: fullName,
      displayLabel: fullName
    };
  });

  return complexDataSource;
}
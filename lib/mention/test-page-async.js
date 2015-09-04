'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTinymce = require('react-tinymce');

var _reactTinymce2 = _interopRequireDefault(_reactTinymce);

var _Mention = require('./Mention');

var _Mention2 = _interopRequireDefault(_Mention);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var plugins = ['autolink', 'autoresize', 'code', 'image', 'link', 'media', 'mention', 'tabfocus'];

var initialContent = 'Sed ut perspiciatis unde omnis\niste natus error sit voluptatem accusantium doloremque\nlaudantium, totam rem aperiam, eaque ipsa quae ab illo\n<br /><br />\n<br />\ninventore veritatis et quasi architecto beatae\nvitae dicta sunt explicabo. Nemo enim ipsam voluptatem\nquia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni\ndolores eos qui ratione voluptatem sequi nesciunt.\n<br />\n<br />\nNeque porro quisquam est, qui dolorem ipsum\n<br />\n<br />\nquia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi\ntempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad\nminima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi\nut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea\nvoluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum\nfugiat quo voluptas nulla pariatur?';

initialContent = '';

renderMentions();
renderEditor();

function renderEditor() {
  _react2['default'].render(_react2['default'].createElement(
    'div',
    null,
    _react2['default'].createElement(_reactTinymce2['default'], {
      content: initialContent,
      config: {
        browser_spellcheck: true,
        document_base_url: window.location.origin + '/',

        // FIXME
        cleanup: false,
        entity_encoding: 'named',
        entities: '160,nbsp',

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
    _react2['default'].createElement(
      'button',
      { onClick: renderMentions },
      'reload'
    )
  ), document.getElementById('editor'));
}

function renderMentions() {
  var node = document.getElementById('mentions');

  if (_react2['default'].unmountComponentAtNode(node)) {
    console.log('reload');
  }

  _react2['default'].render(_react2['default'].createElement(
    'div',
    null,
    _react2['default'].createElement(_Mention2['default'], {
      delimiter: '@',
      showDebugger: true,
      _dataSource: _axios2['default'].get('/examples/shared/api/complex.json'),
      asyncDataSource: function () {
        return new Promise(function (resolve) {
          _axios2['default'].get('/examples/shared/api/complex.json').then(function (response) {
            resolve(transformDataSource(response));
          });
        });
      },

      transformFn: transformDataSource,

      customRTEMention: function (props) {
        var tinymceId = props.tinymceId;
        var displayLabel = props.displayLabel;

        return _react2['default'].createElement(
          'span',
          null,
          _react2['default'].createElement(
            'a',
            { href: '#', id: tinymceId, className: 'tinymce-mention' },
            '@',
            displayLabel
          ),
          ' '
        );
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
      }

    })
  ), node);
}

function transformDataSource(dataSource) {
  if (dataSource && dataSource.data) {
    var complexDataSource = dataSource.data.map(function (result) {
      var fullName = result.fullName;

      return {
        searchKey: fullName,
        displayLabel: fullName
      };
    });

    return complexDataSource;
  } else {
    return [];
  }
}
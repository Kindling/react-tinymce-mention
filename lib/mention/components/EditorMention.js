'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var EditorMention = (function () {
  function EditorMention() {
    _classCallCheck(this, EditorMention);
  }

  _createClass(EditorMention, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var delimiter = _props.delimiter;
      var displayLabel = _props.displayLabel;
      var tinymceId = _props.tinymceId;

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
    }
  }], [{
    key: 'propTypes',
    value: {
      tinymceId: _react.PropTypes.string.isRequired,
      displayLabel: _react.PropTypes.string.isRequired
    },
    enumerable: true
  }]);

  return EditorMention;
})();

exports['default'] = EditorMention;
module.exports = exports['default'];
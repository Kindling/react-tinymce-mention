'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var CustomRTEMention = (function () {
  function CustomRTEMention() {
    _classCallCheck(this, CustomRTEMention);
  }

  _createClass(CustomRTEMention, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var tinymceId = _props.tinymceId;
      var delimiter = _props.delimiter;
      var displayLabel = _props.displayLabel;

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
      displayLabel: _react.PropTypes.string.isRequired,
      delimiter: _react.PropTypes.string.isRequired,
      tinymceId: _react.PropTypes.string.isRequired,
      id: _react.PropTypes.number
    },
    enumerable: true
  }]);

  return CustomRTEMention;
})();

exports['default'] = CustomRTEMention;
module.exports = exports['default'];
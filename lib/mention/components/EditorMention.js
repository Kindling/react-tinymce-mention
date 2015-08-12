'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsUid = require('../utils/uid');

var _utilsUid2 = _interopRequireDefault(_utilsUid);

var EditorMention = (function () {
  function EditorMention() {
    _classCallCheck(this, EditorMention);
  }

  _createClass(EditorMention, [{
    key: 'render',
    value: function render() {
      var mention = this.props.mention;

      var uuid = (0, _utilsUid2['default'])('mention-');

      return _react2['default'].createElement(
        'strong',
        { id: uuid, className: 'mention' },
        '@',
        mention
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      mention: _react.PropTypes.string.isRequired
    },
    enumerable: true
  }]);

  return EditorMention;
})();

exports['default'] = EditorMention;
module.exports = exports['default'];
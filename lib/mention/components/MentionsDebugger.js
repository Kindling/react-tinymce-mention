'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var MentionsDebugger = (function () {
  function MentionsDebugger() {
    _classCallCheck(this, _MentionsDebugger);
  }

  _createClass(MentionsDebugger, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var mentions = _props.mentions;
      var dataSource = _props.dataSource;

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'h2',
          null,
          'Current Mentions'
        ),
        _react2['default'].createElement(
          'ul',
          null,
          mentions && mentions.map(function (mention, index) {
            return _react2['default'].createElement(
              'li',
              { key: 'mention-' + index },
              mention
            );
          })
        ),
        _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'h2',
            null,
            'Available users'
          ),
          _react2['default'].createElement(
            'ul',
            null,
            dataSource instanceof Array && dataSource.map(function (source, index) {
              return _react2['default'].createElement(
                'li',
                { key: 'source-' + index },
                source
              );
            })
          )
        )
      );
    }
  }]);

  var _MentionsDebugger = MentionsDebugger;
  MentionsDebugger = (0, _reactRedux.connect)(function (state) {
    return {
      dataSource: state.mention.dataSource,
      mentions: state.mention.mentions
    };
  })(MentionsDebugger) || MentionsDebugger;
  return MentionsDebugger;
})();

exports['default'] = MentionsDebugger;
module.exports = exports['default'];
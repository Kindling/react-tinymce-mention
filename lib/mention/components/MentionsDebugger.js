'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var MentionsDebugger = (function (_React$Component) {
  _inherits(MentionsDebugger, _React$Component);

  function MentionsDebugger() {
    _classCallCheck(this, MentionsDebugger);

    _get(Object.getPrototypeOf(MentionsDebugger.prototype), 'constructor', this).apply(this, arguments);
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
          _react2['default'].createElement(
            'strong',
            null,
            'Current Mentions'
          )
        ),
        _react2['default'].createElement(
          'ul',
          null,
          mentions.map(function (mention, index) {
            return _react2['default'].createElement(
              'li',
              { key: 'mention-' + index },
              mention.displayLabel
            );
          })
        ),
        _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'h2',
            null,
            _react2['default'].createElement(
              'strong',
              null,
              'Available users'
            )
          ),
          _react2['default'].createElement(
            'ul',
            null,
            dataSource.map(function (source, index) {
              return _react2['default'].createElement(
                'li',
                { key: 'source-' + index },
                source.displayLabel
              );
            })
          )
        )
      );
    }
  }]);

  return MentionsDebugger;
})(_react2['default'].Component);

exports.MentionsDebugger = MentionsDebugger;
exports['default'] = (0, _reactRedux.connect)(function (state) {
  return {
    dataSource: state.mention.dataSource,
    mentions: state.mention.mentions
  };
})(MentionsDebugger);
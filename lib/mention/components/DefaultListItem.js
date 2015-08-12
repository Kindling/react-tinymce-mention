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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _actionsMentionActions = require('../actions/mentionActions');

var DefaultListItem = (function () {
  function DefaultListItem() {
    _classCallCheck(this, _DefaultListItem);
  }

  _createClass(DefaultListItem, [{
    key: 'handleClick',
    value: function handleClick() {
      this.props.dispatch((0, _actionsMentionActions.select)());
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var index = _props.index;
      var highlightIndex = _props.highlightIndex;
      var match = _props.match;

      var classes = (0, _classnames2['default'])({
        'selected': highlightIndex === index,
        'mention-list-item': true
      });

      return _react2['default'].createElement(
        'li',
        { className: classes, onClick: this.handleClick.bind(this) },
        match
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      highlightIndex: _react.PropTypes.number.isRequired,
      index: _react.PropTypes.number.isRequired,
      match: _react.PropTypes.string.isRequired
    },
    enumerable: true
  }]);

  var _DefaultListItem = DefaultListItem;
  DefaultListItem = (0, _reactRedux.connect)(function (state) {
    return {
      highlightIndex: state.mention.highlightIndex
    };
  })(DefaultListItem) || DefaultListItem;
  return DefaultListItem;
})();

exports['default'] = DefaultListItem;
module.exports = exports['default'];
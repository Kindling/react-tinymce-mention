'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var CustomListItem = (function () {
  function CustomListItem() {
    _classCallCheck(this, CustomListItem);
  }

  _createClass(CustomListItem, [{
    key: 'handleClick',
    value: function handleClick() {
      this.props.onClick();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var index = _props.index;
      var highlightIndex = _props.highlightIndex;
      var match = _props.match;

      var classes = (0, _classnames2['default'])({
        'selected': highlightIndex === index
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
      onClick: _react.PropTypes.func.isRequired,
      index: _react.PropTypes.number.isRequired,
      match: _react.PropTypes.string.isRequired
    },
    enumerable: true
  }]);

  return CustomListItem;
})();

exports['default'] = CustomListItem;
module.exports = exports['default'];
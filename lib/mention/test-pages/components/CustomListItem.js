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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var CustomListItem = (function (_React$Component) {
  _inherits(CustomListItem, _React$Component);

  function CustomListItem() {
    _classCallCheck(this, CustomListItem);

    _get(Object.getPrototypeOf(CustomListItem.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(CustomListItem, [{
    key: 'handleClick',
    value: function handleClick(event) {
      event.stopPropagation();
      var _props = this.props;
      var index = _props.index;
      var onClick = _props.onClick;

      onClick(index);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var index = _props2.index;
      var highlightIndex = _props2.highlightIndex;
      var displayLabel = _props2.displayLabel;

      var classes = (0, _classnames2['default'])({
        'tinymce-mention__item--selected': highlightIndex === index,
        'tinymce-mention__item': true
      });

      return _react2['default'].createElement(
        'li',
        { className: classes, onMouseDown: this.handleClick.bind(this), onTouchStart: this.handleClick.bind(this) },
        displayLabel
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      displayLabel: _react.PropTypes.string.isRequired,
      highlightIndex: _react.PropTypes.number.isRequired,
      index: _react.PropTypes.number.isRequired,
      onClick: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  return CustomListItem;
})(_react2['default'].Component);

exports['default'] = CustomListItem;
module.exports = exports['default'];
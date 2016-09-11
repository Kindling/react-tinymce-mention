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
    value: function handleClick(event) {
      event.stopPropagation();
      var _props = this.props;
      var index = _props.index;
      var onClick = _props.onClick;

      onClick(index);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      _react2['default'].initializeTouchEvents(true);
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
})();

exports['default'] = CustomListItem;
module.exports = exports['default'];
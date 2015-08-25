'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CustomListItem = require('./CustomListItem');

var _CustomListItem2 = _interopRequireDefault(_CustomListItem);

var CustomList = (function () {
  function CustomList() {
    _classCallCheck(this, CustomList);
  }

  _createClass(CustomList, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var onClick = _props.onClick;
      var highlightIndex = _props.highlightIndex;
      var matchedSources = _props.matchedSources;

      return _react2['default'].createElement(
        'ul',
        null,
        matchedSources && matchedSources.map(function (source, index) {
          var displayLabel = source.displayLabel;

          return _react2['default'].createElement(_CustomListItem2['default'], {
            displayLabel: displayLabel,
            index: index,
            highlightIndex: highlightIndex,
            onClick: onClick,
            key: 'item-' + index
          });
        })
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      onClick: _react.PropTypes.func.isRequired,
      highlightIndex: _react.PropTypes.number.isRequired,
      matchedSources: _react.PropTypes.array.isRequired
    },
    enumerable: true
  }]);

  return CustomList;
})();

exports['default'] = CustomList;
module.exports = exports['default'];
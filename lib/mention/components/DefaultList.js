'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodashIsequal = require('lodash.isequal');

var _lodashIsequal2 = _interopRequireDefault(_lodashIsequal);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var ReactDOM = _interopRequireWildcard(_reactDom);

var _reactRedux = require('react-redux');

var _DefaultListItemJs = require('./DefaultListItem.js');

var _DefaultListItemJs2 = _interopRequireDefault(_DefaultListItemJs);

var DefaultList = (function (_React$Component) {
  _inherits(DefaultList, _React$Component);

  function DefaultList() {
    _classCallCheck(this, DefaultList);

    _get(Object.getPrototypeOf(DefaultList.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(DefaultList, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _lodashIsequal2['default'])(nextProps.matchedSources, this.props.matchedSources) || nextProps.highlightIndex !== this.props.highlightIndex;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _props = this.props;
      var highlightIndex = _props.highlightIndex;
      var matchedSources = _props.matchedSources;

      if (matchedSources.length) {
        var listNode = ReactDOM.findDOMNode(this.refs.mentionList);
        var focusedListItemNode = ReactDOM.findDOMNode(this.refs['listItem' + highlightIndex]);
        var listRect = listNode.getBoundingClientRect();
        var focusedRect = focusedListItemNode.getBoundingClientRect();

        if (focusedRect.bottom > listRect.bottom || focusedRect.top < listRect.top) {
          listNode.scrollTop = focusedListItemNode.offsetTop + focusedListItemNode.clientHeight - listNode.offsetHeight;
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var matchedSources = this.props.matchedSources;

      return _react2['default'].createElement(
        'div',
        null,
        matchedSources && matchedSources.length ? _react2['default'].createElement(
          'ul',
          { className: 'tinymce-mention__list', ref: 'mentionList' },
          matchedSources.map(function (match, index) {
            var displayLabel = match.displayLabel;

            return _react2['default'].createElement(_DefaultListItemJs2['default'], {
              ref: 'listItem' + index,
              displayLabel: displayLabel,
              index: index,
              key: 'match-' + index
            });
          })
        ) : null
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      matchedSources: _react.PropTypes.array.isRequired
    },
    enumerable: true
  }]);

  return DefaultList;
})(_react2['default'].Component);

exports.DefaultList = DefaultList;
exports['default'] = (0, _reactRedux.connect)(function (state) {
  return {
    highlightIndex: state.mention.highlightIndex,
    matchedSources: state.mention.matchedSources
  };
})(DefaultList);
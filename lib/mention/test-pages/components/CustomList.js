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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _CustomListItem = require('./CustomListItem');

var _CustomListItem2 = _interopRequireDefault(_CustomListItem);

var MentionList = (function (_React$Component) {
  _inherits(MentionList, _React$Component);

  function MentionList() {
    _classCallCheck(this, MentionList);

    _get(Object.getPrototypeOf(MentionList.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(MentionList, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _props = this.props;
      var highlightIndex = _props.highlightIndex;
      var matchedSources = _props.matchedSources;

      if (matchedSources.length) {
        var listNode = _reactDom2['default'].findDOMNode(this.refs.mentionList);
        var focusedListItemNode = _reactDom2['default'].findDOMNode(this.refs['listItem' + highlightIndex]);
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
      var _props2 = this.props;
      var fetching = _props2.fetching;
      var highlightIndex = _props2.highlightIndex;
      var matchedSources = _props2.matchedSources;
      var onClick = _props2.onClick;

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'ul',
          { className: 'tinymce-mention__list', ref: 'mentionList' },
          matchedSources.length ? matchedSources.map(function (source, index) {
            var displayLabel = source.displayLabel;
            var id = source.id;

            return _react2['default'].createElement(_CustomListItem2['default'], {
              onClick: onClick,
              highlightIndex: highlightIndex,
              id: id,
              index: index,
              displayLabel: displayLabel,
              key: 'match-' + index,
              ref: 'listItem' + index
            });
          }) : fetching && _react2['default'].createElement(
            'li',
            { className: 'tinymce-mention__item--loading' },
            _react2['default'].createElement(
              'strong',
              null,
              'loading'
            )
          )
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      fetching: _react.PropTypes.bool.isRequired,
      highlightIndex: _react.PropTypes.number.isRequired,
      matchedSources: _react.PropTypes.array.isRequired,
      onClick: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  return MentionList;
})(_react2['default'].Component);

exports['default'] = MentionList;
module.exports = exports['default'];
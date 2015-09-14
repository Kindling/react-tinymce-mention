'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodashIsequal = require('lodash.isequal');

var _lodashIsequal2 = _interopRequireDefault(_lodashIsequal);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _DefaultListItemJs = require('./DefaultListItem.js');

var _DefaultListItemJs2 = _interopRequireDefault(_DefaultListItemJs);

var DefaultList = (function () {
  function DefaultList() {
    _classCallCheck(this, DefaultList);
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
        var listNode = _react2['default'].findDOMNode(this.refs.mentionList);
        var focusedListItemNode = _react2['default'].findDOMNode(this.refs['listItem' + highlightIndex]);
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
})();

exports.DefaultList = DefaultList;
exports['default'] = (0, _reactRedux.connect)(function (state) {
  return {
    highlightIndex: state.mention.highlightIndex,
    matchedSources: state.mention.matchedSources
  };
})(DefaultList);
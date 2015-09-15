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

var MentionList = (function () {
  function MentionList() {
    _classCallCheck(this, MentionList);
  }

  _createClass(MentionList, [{
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
})();

exports['default'] = MentionList;
module.exports = exports['default'];
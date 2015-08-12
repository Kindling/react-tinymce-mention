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

var _mentionComponentsDefaultListItemJs = require('mention/components/DefaultListItem.js');

var _mentionComponentsDefaultListItemJs2 = _interopRequireDefault(_mentionComponentsDefaultListItemJs);

var DefaultList = (function () {
  function DefaultList() {
    _classCallCheck(this, _DefaultList);
  }

  _createClass(DefaultList, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _lodashIsequal2['default'])(nextProps.matchedSources, this.props.matchedSources);
    }
  }, {
    key: 'render',
    value: function render() {
      var matchedSources = this.props.matchedSources;

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'h2',
          null,
          'List popup'
        ),
        _react2['default'].createElement(
          'ul',
          { className: 'mention-list' },
          matchedSources && matchedSources.map(function (match, index) {
            return _react2['default'].createElement(_mentionComponentsDefaultListItemJs2['default'], {
              match: match,
              index: index,
              key: 'match-' + index
            });
          })
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      matchedSources: _react.PropTypes.array.isRequired
    },
    enumerable: true
  }]);

  var _DefaultList = DefaultList;
  DefaultList = (0, _reactRedux.connect)(function (state) {
    return {
      matchedSources: state.mention.matchedSources
    };
  })(DefaultList) || DefaultList;
  return DefaultList;
})();

exports['default'] = DefaultList;
module.exports = exports['default'];
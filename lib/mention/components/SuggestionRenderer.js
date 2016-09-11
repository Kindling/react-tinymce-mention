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

var _reactRedux = require('react-redux');

var _actionsMentionActions = require('../actions/mentionActions');

var _componentsDefaultListJs = require('../components/DefaultList.js');

var _componentsDefaultListJs2 = _interopRequireDefault(_componentsDefaultListJs);

var SuggestionRenderer = (function (_React$Component) {
  _inherits(SuggestionRenderer, _React$Component);

  function SuggestionRenderer() {
    _classCallCheck(this, SuggestionRenderer);

    _get(Object.getPrototypeOf(SuggestionRenderer.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(SuggestionRenderer, [{
    key: '_renderCustomComponents',
    value: function _renderCustomComponents() {
      var _props = this.props;
      var customListRenderer = _props.customListRenderer;
      var fetching = _props.fetching;
      var highlightIndex = _props.highlightIndex;
      var matchedSources = _props.matchedSources;
      var dispatch = _props.dispatch;

      var onClick = function onClick(index) {
        return dispatch((0, _actionsMentionActions.select)(index));
      };

      return customListRenderer({
        fetching: fetching,
        highlightIndex: highlightIndex,
        matchedSources: matchedSources,
        clickFn: onClick
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var customListRenderer = this.props.customListRenderer;

      return customListRenderer instanceof Function ? this._renderCustomComponents() : _react2['default'].createElement(_componentsDefaultListJs2['default'], null);
    }
  }], [{
    key: 'propTypes',
    value: {
      highlightIndex: _react.PropTypes.number.isRequired,
      matchedSources: _react.PropTypes.array.isRequired,
      customListRenderer: _react.PropTypes.func
    },
    enumerable: true
  }]);

  return SuggestionRenderer;
})(_react2['default'].Component);

exports.SuggestionRenderer = SuggestionRenderer;
exports['default'] = (0, _reactRedux.connect)(function (state) {
  return {
    fetching: state.mention.fetching,
    highlightIndex: state.mention.highlightIndex,
    matchedSources: state.mention.matchedSources
  };
})(SuggestionRenderer);
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actionsMentionActions = require('../actions/mentionActions');

var _componentsDefaultListJs = require('../components/DefaultList.js');

var _componentsDefaultListJs2 = _interopRequireDefault(_componentsDefaultListJs);

var SuggestionRenderer = (function () {
  function SuggestionRenderer() {
    _classCallCheck(this, _SuggestionRenderer);
  }

  _createClass(SuggestionRenderer, [{
    key: '_renderCustomComponents',
    value: function _renderCustomComponents() {
      var _props = this.props;
      var customRenderer = _props.customRenderer;
      var highlightIndex = _props.highlightIndex;
      var matchedSources = _props.matchedSources;
      var dispatch = _props.dispatch;

      var onClick = function onClick() {
        return dispatch((0, _actionsMentionActions.select)());
      };

      return customRenderer({
        highlightIndex: highlightIndex,
        matchedSources: matchedSources,
        clickFn: onClick
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var customRenderer = this.props.customRenderer;

      return customRenderer ? this._renderCustomComponents() : _react2['default'].createElement(_componentsDefaultListJs2['default'], null);
    }
  }], [{
    key: 'propTypes',
    value: {
      highlightIndex: _react.PropTypes.number.isRequired,
      matchedSources: _react.PropTypes.array.isRequired,
      customRenderer: _react.PropTypes.func
    },
    enumerable: true
  }]);

  var _SuggestionRenderer = SuggestionRenderer;
  SuggestionRenderer = (0, _reactRedux.connect)(function (state) {
    return {
      editor: state.mention.editor,
      highlightIndex: state.mention.highlightIndex,
      matchedSources: state.mention.matchedSources
    };
  })(SuggestionRenderer) || SuggestionRenderer;
  return SuggestionRenderer;
})();

exports['default'] = SuggestionRenderer;
module.exports = exports['default'];
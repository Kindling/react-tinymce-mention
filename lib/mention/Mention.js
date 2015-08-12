'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _reactRedux = require('react-redux');

var _mentionPlugin = require('mention/plugin');

var _mentionActionsMentionActions = require('mention/actions/mentionActions');

var _mentionUtilsInitializeRedux = require('mention/utils/initializeRedux');

var _mentionUtilsInitializeRedux2 = _interopRequireDefault(_mentionUtilsInitializeRedux);

var _mentionReducersMentionReducer = require('mention/reducers/mentionReducer');

var _mentionReducersMentionReducer2 = _interopRequireDefault(_mentionReducersMentionReducer);

var _mentionComponentsTinyMCEDelegate = require('mention/components/TinyMCEDelegate');

var _mentionComponentsTinyMCEDelegate2 = _interopRequireDefault(_mentionComponentsTinyMCEDelegate);

var _mentionComponentsSuggestionRenderer = require('mention/components/SuggestionRenderer');

var _mentionComponentsSuggestionRenderer2 = _interopRequireDefault(_mentionComponentsSuggestionRenderer);

var _mentionComponentsMentionsDebugger = require('mention/components/MentionsDebugger');

var _mentionComponentsMentionsDebugger2 = _interopRequireDefault(_mentionComponentsMentionsDebugger);

var store = (0, _mentionUtilsInitializeRedux2['default'])({
  mention: _mentionReducersMentionReducer2['default']
});

var Mention = (function () {
  function Mention() {
    _classCallCheck(this, _Mention);
  }

  _createClass(Mention, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props;
      var dataSource = _props.dataSource;
      var delimiter = _props.delimiter;

      (0, _mentionPlugin.initializePlugin)(store, dataSource, delimiter).then(this._transformAndDispatch.bind(this))['catch'](function (error) {
        console.error(error);
      });
    }
  }, {
    key: '_transformResponse',
    value: function _transformResponse(resolvedDataSource) {
      var transformFn = this.props.transformFn;

      var isFunc = typeof transformFn === 'function';

      (0, _invariant2['default'])(isFunc || typeof transformFn === 'undefined', 'Error initializing plugin: `transformFn` must be a function.');

      var transformedDataSource = isFunc ? transformFn(resolvedDataSource) : resolvedDataSource;

      (0, _invariant2['default'])(transformedDataSource instanceof Array, 'Error transforming response: `transformedDataSource` must be an array.');

      return transformedDataSource;
    }
  }, {
    key: '_transformAndDispatch',
    value: function _transformAndDispatch(_ref) {
      var editor = _ref.editor;
      var resolvedDataSource = _ref.resolvedDataSource;

      var dataSource = this._transformResponse(resolvedDataSource);
      store.dispatch((0, _mentionActionsMentionActions.finalizeSetup)(editor, dataSource));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var customRenderer = _props2.customRenderer;
      var onAdd = _props2.onAdd;

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(_mentionComponentsSuggestionRenderer2['default'], {
          customRenderer: customRenderer
        }),
        _react2['default'].createElement(_mentionComponentsTinyMCEDelegate2['default'], {
          onAdd: onAdd
        }),
        _react2['default'].createElement(_mentionComponentsMentionsDebugger2['default'], null)
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      dataSource: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.func, _react.PropTypes.object]).isRequired,
      customRenderer: _react2['default'].PropTypes.func,
      delimiter: _react.PropTypes.string,
      onAdd: _react2['default'].PropTypes.func,
      transformFn: _react.PropTypes.func
    },
    enumerable: true
  }]);

  var _Mention = Mention;
  Mention = (0, _reactRedux.provide)(store)(Mention) || Mention;
  return Mention;
})();

exports['default'] = Mention;
module.exports = exports['default'];
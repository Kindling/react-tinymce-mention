'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _reactRedux = require('react-redux');

var _plugin = require('./plugin');

var _utilsInitializeRedux = require('./utils/initializeRedux');

var _utilsInitializeRedux2 = _interopRequireDefault(_utilsInitializeRedux);

var _utilsNormalizeDataSource = require('./utils/normalizeDataSource');

var _utilsNormalizeDataSource2 = _interopRequireDefault(_utilsNormalizeDataSource);

var _actionsMentionActions = require('./actions/mentionActions');

var _reducersMentionReducer = require('./reducers/mentionReducer');

var _reducersMentionReducer2 = _interopRequireDefault(_reducersMentionReducer);

var _componentsTinyMCEDelegate = require('./components/TinyMCEDelegate');

var _componentsTinyMCEDelegate2 = _interopRequireDefault(_componentsTinyMCEDelegate);

var _componentsSuggestionRenderer = require('./components/SuggestionRenderer');

var _componentsSuggestionRenderer2 = _interopRequireDefault(_componentsSuggestionRenderer);

var _componentsMentionsDebugger = require('./components/MentionsDebugger');

var _componentsMentionsDebugger2 = _interopRequireDefault(_componentsMentionsDebugger);

var Mention = (function (_React$Component) {
  _inherits(Mention, _React$Component);

  function Mention() {
    _classCallCheck(this, Mention);

    _get(Object.getPrototypeOf(Mention.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Mention, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var asyncDataSource = this.props.asyncDataSource;

      this.store = (0, _utilsInitializeRedux2['default'])({ mention: _reducersMentionReducer2['default'] }, {
        mention: _extends({}, _reducersMentionReducer.initialState, {
          asyncDataSource: asyncDataSource
        })
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props;
      var _props$dataSource = _props.dataSource;
      var dataSource = _props$dataSource === undefined ? [] : _props$dataSource;
      var delimiter = _props.delimiter;

      (0, _plugin.initializePlugin)(this.store, dataSource, delimiter).then(this._transformAndDispatch.bind(this))['catch'](function (error) {
        console.error(error);
      });
    }
  }, {
    key: '_transformResponse',
    value: function _transformResponse(resolvedDataSource, transformFn) {
      var isFunc = typeof transformFn === 'function';

      (0, _invariant2['default'])(isFunc || typeof transformFn === 'undefined', 'Error initializing plugin: `transformFn` must be a function.');

      var transformedDataSource = isFunc ? transformFn(resolvedDataSource) : resolvedDataSource;

      return (0, _utilsNormalizeDataSource2['default'])(transformedDataSource);
    }
  }, {
    key: '_transformAndDispatch',
    value: function _transformAndDispatch(_ref) {
      var editor = _ref.editor;
      var resolvedDataSource = _ref.resolvedDataSource;

      var _transformResponse2 = this._transformResponse(resolvedDataSource, this.props.transformFn);

      var dataSource = _transformResponse2.dataSource;

      this.store.dispatch((0, _actionsMentionActions.finalizeSetup)(editor, dataSource));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var beforeAdd = _props2.beforeAdd;
      var customListRenderer = _props2.customListRenderer;
      var customRTEMention = _props2.customRTEMention;
      var delimiter = _props2.delimiter;
      var onAdd = _props2.onAdd;
      var onRemove = _props2.onRemove;
      var showDebugger = _props2.showDebugger;

      return _react2['default'].createElement(
        _reactRedux.Provider,
        { store: this.store },
        _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(_componentsSuggestionRenderer2['default'], {
            customListRenderer: customListRenderer
          }),
          _react2['default'].createElement(_componentsTinyMCEDelegate2['default'], {
            delimiter: delimiter,
            customRTEMention: customRTEMention,
            beforeAdd: beforeAdd,
            onAdd: onAdd,
            onRemove: onRemove
          }),
          showDebugger && _react2['default'].createElement(_componentsMentionsDebugger2['default'], null)
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      dataSource: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.func, _react.PropTypes.object]),
      asyncDataSource: _react.PropTypes.func,
      beforeAdd: _react.PropTypes.func,
      customListRenderer: _react.PropTypes.func,
      customRTEMention: _react.PropTypes.func,
      delimiter: _react.PropTypes.string,
      onAdd: _react.PropTypes.func,
      onRemove: _react.PropTypes.func,
      showDebugger: _react.PropTypes.bool,
      transformFn: _react.PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      delimiter: '@'
    },
    enumerable: true
  }]);

  return Mention;
})(_react2['default'].Component);

exports['default'] = Mention;
module.exports = exports['default'];
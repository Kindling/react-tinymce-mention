'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodashIsequal = require('lodash.isequal');

var _lodashIsequal2 = _interopRequireDefault(_lodashIsequal);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _utilsDiffMentionState = require('../utils/diffMentionState');

var _utilsDiffMentionState2 = _interopRequireDefault(_utilsDiffMentionState);

var _utilsLast = require('../utils/last');

var _utilsLast2 = _interopRequireDefault(_utilsLast);

var _utilsRenderComponent = require('../utils/renderComponent');

var _utilsRenderComponent2 = _interopRequireDefault(_utilsRenderComponent);

var _componentsEditorMention = require('../components/EditorMention');

var _componentsEditorMention2 = _interopRequireDefault(_componentsEditorMention);

var TinyMCEDelegate = (function (_Component) {
  _inherits(TinyMCEDelegate, _Component);

  function TinyMCEDelegate() {
    _classCallCheck(this, _TinyMCEDelegate);

    _get(Object.getPrototypeOf(_TinyMCEDelegate.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      shouldRender: false
    };
  }

  _createClass(TinyMCEDelegate, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var nextEditorId = nextProps.editor && nextProps.editor.id;
      var editorId = this.props.editor && this.props.editor.id;

      return nextEditorId !== editorId || !(0, _lodashIsequal2['default'])(nextProps.mentions, this.props.mentions);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props;
      var mentions = _props.mentions;
      var onAdd = _props.onAdd;
      var onRemove = _props.onRemove;

      var nextMentions = nextProps.mentions;
      var currLength = mentions.length;
      var nextLength = nextMentions.length;
      var shouldAdd = currLength < nextLength;
      var shouldRemove = currLength > nextLength;

      if (shouldAdd && onAdd) {
        onAdd({
          mentions: nextMentions,
          changed: [(0, _utilsLast2['default'])(nextMentions)]
        });
      }

      if (shouldRemove && onRemove) {
        onRemove((0, _utilsDiffMentionState2['default'])(mentions, nextMentions));
      }

      this.setState({
        shouldRender: shouldAdd
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var shouldRender = this.state.shouldRender;
      var _props2 = this.props;
      var editor = _props2.editor;
      var mentions = _props2.mentions;

      var mentionsValid = mentions && mentions.length;

      if (editor && mentionsValid && shouldRender) {
        this._renderMentionIntoEditor();
      }
    }
  }, {
    key: '_renderMentionIntoEditor',
    value: function _renderMentionIntoEditor() {
      var _props3 = this.props;
      var customRTEMention = _props3.customRTEMention;
      var delimiter = _props3.delimiter;
      var editor = _props3.editor;
      var mentions = _props3.mentions;

      var mention = (0, _utilsLast2['default'])(mentions);
      var markup = customRTEMention ? customRTEMention(_extends({}, mention, { delimiter: delimiter })) : _react2['default'].createElement(_componentsEditorMention2['default'], _extends({}, mention, {
        delimiter: delimiter
      }));

      editor.insertContent('insertionplaceholder<span id="cursor"></span>');

      editor.setContent(editor.getContent().replace(re, (0, _utilsRenderComponent2['default'])(markup)));

      setTimeout(function () {
        editor.getBody().focus();
        editor.selection.select(editor.dom.select('#cursor')[0]);
        editor.selection.collapse(true);
        editor.dom.remove(editor.dom.select('#cursor')[0]);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }], [{
    key: 'propTypes',
    value: {
      customRTEMention: _react.PropTypes.func,
      editor: _react.PropTypes.object,
      mentions: _react.PropTypes.array,
      onAdd: _react.PropTypes.func,
      onRemove: _react.PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      mentions: []
    },
    enumerable: true
  }]);

  var _TinyMCEDelegate = TinyMCEDelegate;
  TinyMCEDelegate = (0, _reactRedux.connect)(function (state) {
    return {
      editor: state.mention.editor,
      mentions: state.mention.mentions
    };
  })(TinyMCEDelegate) || TinyMCEDelegate;
  return TinyMCEDelegate;
})(_react.Component);

exports['default'] = TinyMCEDelegate;
module.exports = exports['default'];
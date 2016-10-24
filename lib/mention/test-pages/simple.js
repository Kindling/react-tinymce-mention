'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _componentsEditor = require('./components/Editor');

var _componentsEditor2 = _interopRequireDefault(_componentsEditor);

var _Mention = require('../Mention');

var _Mention2 = _interopRequireDefault(_Mention);

var _apiSimpleDataSource = require('./api/simpleDataSource');

var _apiSimpleDataSource2 = _interopRequireDefault(_apiSimpleDataSource);

_reactDom2['default'].render(_react2['default'].createElement(
  'div',
  null,
  _react2['default'].createElement(_componentsEditor2['default'], null),
  _react2['default'].createElement(_Mention2['default'], {
    showDebugger: true,
    dataSource: _apiSimpleDataSource2['default']
  })
), document.getElementById('root'));
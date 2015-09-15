'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = renderComponent;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function renderComponent(component) {
  return _react2['default'].renderToStaticMarkup(component);
}

module.exports = exports['default'];
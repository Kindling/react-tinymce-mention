'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = renderComponent;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactDomServer = require('react-dom/server');

var _reactDomServer2 = _interopRequireDefault(_reactDomServer);

function renderComponent(component) {
  return _reactDomServer2['default'].renderToStaticMarkup(component);
}

module.exports = exports['default'];
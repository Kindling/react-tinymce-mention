'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getKeyCode;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function getKeyCode(event) {
  (0, _invariant2['default'])(event, 'Error returning keyCode: `event` is undefined.');

  return event.which || event.keyCode;
}

module.exports = exports['default'];
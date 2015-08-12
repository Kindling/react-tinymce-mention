'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = uid;
var id = 0;

function uid() {
  var prefix = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

  return String(prefix + id++);
}

;
module.exports = exports['default'];
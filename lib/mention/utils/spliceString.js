'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = spliceSplit;

function spliceSplit(str, index, count, add) {
  var ar = str.split('');
  ar.splice(index, count, add);
  return ar.join('');
}

module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = diffMentionState;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashDifference = require('lodash.difference');

var _lodashDifference2 = _interopRequireDefault(_lodashDifference);

function diffMentionState(mentions, nextMentions) {
  var diff = (0, _lodashDifference2['default'])(mentions, nextMentions);

  return {
    mentions: nextMentions,
    changed: diff
  };
}

module.exports = exports['default'];
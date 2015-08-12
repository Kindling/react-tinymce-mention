'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mentionMention = require('./mention/Mention');

var _mentionMention2 = _interopRequireDefault(_mentionMention);

try {
  if (__DEV__) {
    require('./mention/test-page');
  }
} catch (error) {}

exports['default'] = _mentionMention2['default'];
module.exports = exports['default'];
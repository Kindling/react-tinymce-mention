'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('string.prototype.includes');

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

var _mentionMention = require('./mention/Mention');

var _mentionMention2 = _interopRequireDefault(_mentionMention);

_es6Promise2['default'].polyfill();

// require('./mention/test-pages/simple');
// require('./mention/test-pages/complex');
// require('./mention/test-pages/promise');
// require('./mention/test-pages/async');

exports['default'] = _mentionMention2['default'];
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = extractMentions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _twitterText = require('twitter-text');

var _twitterText2 = _interopRequireDefault(_twitterText);

function extractMentions(content, delimiter) {
  var mentions = undefined,
      prop = undefined;

  if (delimiter === '@') {
    mentions = _twitterText2['default'].extractMentionsWithIndices(content);
    prop = 'screenName';
  } else if (delimiter === '#') {
    mentions = _twitterText2['default'].extractHashtagsWithIndices(content);
    prop = 'hashtag';
  } else {
    throw new Error('Error extracting mentions: ' + delimiter + ' must be either \'@\' or \'#\'');
  }

  return { mentions: mentions, prop: prop };
}

module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports.prevCharIsSpace = prevCharIsSpace;
exports.removeMention = removeMention;
exports.findMentions = findMentions;
exports.getEditorContent = getEditorContent;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _twitterText = require('twitter-text');

var _twitterText2 = _interopRequireDefault(_twitterText);

var _last = require('./last');

var _last2 = _interopRequireDefault(_last);

function prevCharIsSpace(editor) {
  (0, _invariant2['default'])(editor, 'Error detecting previous char: `editor` is undefined.');

  var start = editor.selection.getRng(true).startOffset;
  var text = editor.selection.getRng(true).startContainer.data || '';
  var character = text.substr(start - 1, 1);

  return !!character.trim().length ? false : true;
}

function removeMention(editor, startPos) {
  (0, _invariant2['default'])(editor, 'Error removing mention: `editor` is undefined.');

  return editor.getContent().slice(0, startPos - 1) + '&nbsp;';
}

function findMentions(editor) {
  (0, _invariant2['default'])(editor, 'Error finding Mentions: `editor` is undefined.');

  var content = editor.getContent();
  var mentions = _twitterText2['default'].extractMentionsWithIndices(content);
  var lastMention = (0, _last2['default'])(mentions);
  var screenName = lastMention.screenName;

  var _lastMention$indices = _slicedToArray(lastMention.indices, 2);

  var startPos = _lastMention$indices[0];
  var endPos = _lastMention$indices[1];

  return {
    mentions: mentions,
    lastMention: {
      screenName: screenName,
      startPos: startPos,
      endPos: endPos
    }
  };
}

function getEditorContent(editor) {
  var format = arguments.length <= 1 || arguments[1] === undefined ? 'text' : arguments[1];

  (0, _invariant2['default'])(editor, 'Error returning editor content: `editor` is undefined.');

  return editor.getContent({ format: format });
}
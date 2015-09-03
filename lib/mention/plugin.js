'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.initializePlugin = initializePlugin;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _twitterText = require('twitter-text');

var _twitterText2 = _interopRequireDefault(_twitterText);

var _domClosest = require('dom-closest');

var _domClosest2 = _interopRequireDefault(_domClosest);

var _domRemove = require('dom-remove');

var _domRemove2 = _interopRequireDefault(_domRemove);

var _lodashFindwhere = require('lodash.findwhere');

var _lodashFindwhere2 = _interopRequireDefault(_lodashFindwhere);

var _utilsGetKeyCode = require('./utils/getKeyCode');

var _utilsGetKeyCode2 = _interopRequireDefault(_utilsGetKeyCode);

var _utilsTinyMCEUtils = require('./utils/tinyMCEUtils');

var _actionsMentionActions = require('./actions/mentionActions');

var keyMap = {
  BACKSPACE: 8,
  DOWN: 40,
  ENTER: 13,
  TAB: 9,
  UP: 38,
  ESC: 27
};

var editor = undefined;
var delimiter = '@';
var isFocused = false;
var store = undefined;

/**
 * A little state machine for tracking typed characters after `@ment|`.  Allows us
 * to determine if we are within a mention when `isFocued` is active.
 * @type {String}
 */
var typedMention = '';

function initializePlugin(reduxStore, dataSource) {
  var delimiterConfig = arguments.length <= 2 || arguments[2] === undefined ? delimiter : arguments[2];

  (0, _invariant2['default'])(reduxStore, 'Plugin must be initialized with a Redux store.');

  (0, _invariant2['default'])(dataSource, 'Plugin must be initialized with a dataSource.  Datasource can be an array or promise.');

  return new Promise(function (resolve, reject) {

    if (typeof window.tinymce === 'undefined') {
      return reject('Error initializing Mention plugin: `tinymce` is undefined.');
    }

    window.tinymce.PluginManager.add('mention', function (activeEditor) {
      editor = activeEditor;
      store = reduxStore;
      delimiter = delimiterConfig;

      // If promise, wait for it to resolve before resolving the
      // outer promise and initializing the app.
      if (typeof dataSource.then === 'function') {
        dataSource.then(function (response) {
          setTimeout(start, 100); // FF fix
          resolve({ editor: editor, resolvedDataSource: response });
        });

        // Spec-compliant promise
        if (dataSource['catch'] === 'function') {
          dataSource['catch'](function (error) {
            throw new Error(error);
          });

          // jQuery
        } else if (dataSource.fail === 'function') {
            dataSource.fail(function (error) {
              throw new Error(error);
            });
          }
      } else {
        setTimeout(start, 100);
        resolve({ editor: editor, resolvedDataSource: dataSource });
      }
    });
  });
}

function start() {
  stop();

  editor.on('keypress', handleTopLevelEditorInput);
  editor.on('keydown', handleTopLevelActionKeys);
  editor.on('keyup', handleEditorBackspace);
}

function stop() {
  editor.off();
}

/**
 * Add persistent top-level listener for delegating handlers for
 * binding and unbinding events related to UI interaction / querying.
 * @param  {jQuery.Event} event
 */
function handleTopLevelEditorInput(event) {
  var keyCode = (0, _utilsGetKeyCode2['default'])(event);
  var character = String.fromCharCode(keyCode);
  var delimiterIndex = delimiter.indexOf(character);

  normalizeEditorInput();

  if (!isFocused && delimiterIndex > -1) {
    startListeningForInput();
  } else if (!isFocused || character === ' ') {
    stopListeningAndCleanup();
  }
}

function handleTopLevelActionKeys(event) {
  var keyCode = (0, _utilsGetKeyCode2['default'])(event);

  if (isFocused && keyCode === keyMap.BACKSPACE) {
    if ((0, _utilsTinyMCEUtils.getLastChar)(editor) === delimiter) {
      stopListeningAndCleanup();
    } else {
      var mentionText = updateMentionText(keyCode);
      store.dispatch((0, _actionsMentionActions.query)(mentionText));
    }
  }
}

function startListeningForInput() {
  if (toggleFocus()) {
    editor.on('keydown', handleActionKeys);
    editor.on('keypress', handleKeyPress);
  }
}

function stopListeningAndCleanup() {
  if (isFocused) {
    toggleFocus();
  }

  clearTypedMention();
  store.dispatch((0, _actionsMentionActions.resetQuery)());
  editor.off('keydown', handleActionKeys);
  editor.off('keypress', handleKeyPress);
}

function handleActionKeys(event) {
  var keyCode = (0, _utilsGetKeyCode2['default'])(event);

  if (shouldSelectOrMove(keyCode, event)) {
    event.preventDefault();
    return false;
  }
}

/**
 * Handler for internal key-presses. Parses the input and dispatches
 * queries back to the store for list view and selection.
 * @param  {jQuery.Event} event
 */
function handleKeyPress(event) {
  var keyCode = (0, _utilsGetKeyCode2['default'])(event);

  setTimeout(function () {
    var mentionText = updateMentionText(keyCode);

    if (mentionText !== '') {
      var content = (0, _utilsTinyMCEUtils.getEditorContent)(editor);
      var extractedMentions = _twitterText2['default'].extractMentionsWithIndices(content);

      var mention = (0, _lodashFindwhere2['default'])(extractedMentions, {
        screenName: mentionText
      });

      if (mention) {
        store.dispatch((0, _actionsMentionActions.query)(mention.screenName));
      }
    }
  }, 0);
}

/**
 * Handler for backspace presses. Dispatches back to store with request
 * to reset the current query and matches.
 * @param  {jQuery.Event} event
 */
function handleEditorBackspace(event) {
  var keyCode = (0, _utilsGetKeyCode2['default'])(event);
  var mentionClassName = '.tinymce-mention';

  if (keyCode === keyMap.BACKSPACE) {
    var foundMentionNode = (0, _domClosest2['default'])(editor.selection.getNode(), mentionClassName);

    // Query lookup
    if (foundMentionNode) {
      var mention = removeMentionFromEditor(foundMentionNode);
      store.dispatch((0, _actionsMentionActions.remove)(mention));

      // Remove all mentions
    } else if (!(0, _utilsTinyMCEUtils.getEditorContent)(editor).trim().length) {
        store.dispatch((0, _actionsMentionActions.resetMentions)());
        stopListeningAndCleanup();

        // Default, validate internal mention state and sync if necessary. Use-case:
        // if the user highlights an @mention and then deletes, we can no longer check
        // the proximity of the cursor via regex and thus need to collect ids and sync.
      } else {
          var mentionIds = (0, _utilsTinyMCEUtils.collectMentionIds)(editor, mentionClassName);
          store.dispatch((0, _actionsMentionActions.syncEditorState)(mentionIds));
        }
  }
}

function shouldSelectOrMove(keyCode, event) {
  var matchedSources = store.getState().mention.matchedSources;

  if (matchedSources.length) {
    if (keyCode === keyMap.BACKSPACE) {
      updateTypedMention(keyCode);
      return handleKeyPress(event);
    } else {
      switch (keyCode) {
        case keyMap.TAB:
          return selectMention();
        case keyMap.ENTER:
          return selectMention();
        case keyMap.DOWN:
          return store.dispatch((0, _actionsMentionActions.moveDown)());
        case keyMap.UP:
          return store.dispatch((0, _actionsMentionActions.moveUp)());
        case keyMap.ESC:
          return stopListeningAndCleanup();
        default:
          return false;
      }
    }
  }
}

function toggleFocus() {
  isFocused = !isFocused;
  return isFocused;
}

function updateMentionText(keyCode) {
  var mentionText = keyCode !== keyMap.BACKSPACE ? updateTypedMention((0, _utilsTinyMCEUtils.getLastChar)(editor)) : backspaceTypedMention();

  return mentionText;
}

function updateTypedMention(str) {
  typedMention += str;
  return typedMention.trim();
}

function backspaceTypedMention() {
  typedMention = typedMention.substring(0, typedMention.length - 1);
  return typedMention.trim();
}

function clearTypedMention() {
  typedMention = '';
}

function selectMention() {
  store.dispatch((0, _actionsMentionActions.select)());
  clearTypedMention();
  stopListeningAndCleanup();
  return true;
}

function extractMentionFromNode(mentionNode) {
  return mentionNode.innerHTML.replace(/(?:@|_)/g, '').trim();
}

function removeMentionFromEditor(mentionNode) {
  (0, _domRemove2['default'])(mentionNode);
  insertSpace();
  return extractMentionFromNode(mentionNode);
}

function normalizeEditorInput() {

  // Force a root element in case one doesn't exist.
  if (editor.getContent() === '') {
    editor.insertContent(' ');
  }
}

function insertSpace() {
  // if (window.tinymce.isGecko) {
  console.log(editor.dom.getRoot(), editor.dom.getRoot().childNodes);
  tinymce.activeEditor.execCommand('mceInsertContent', false, '&nbsp;');
  // editor.insertContent('[___space___]');
  // editor.setContent(editor.getContent().replace('[__space__]', ' '));
  // moveCursorToEnd(editor);
  // }
}

// Export methods for testing
var testExports = {
  _handleKeyPress: handleKeyPress,
  _handleEditorBackspace: handleEditorBackspace,
  _removeMentionFromEditor: removeMentionFromEditor,
  _extractMentionFromNode: extractMentionFromNode
};
exports.testExports = testExports;
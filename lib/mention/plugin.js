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

var _mentionUtilsLast = require('mention/utils/last');

var _mentionUtilsLast2 = _interopRequireDefault(_mentionUtilsLast);

var _mentionUtilsGetKeyCode = require('mention/utils/getKeyCode');

var _mentionUtilsGetKeyCode2 = _interopRequireDefault(_mentionUtilsGetKeyCode);

var _mentionUtilsTinyMCEUtils = require('mention/utils/tinyMCEUtils');

var _mentionActionsMentionActions = require('mention/actions/mentionActions');

var keyMap = {
  BACKSPACE: 8,
  DOWN: 40,
  ENTER: 13,
  TAB: 9,
  UP: 38
};

/**
 * Reference to the TinyMCE editor.
 * @type {Object}
 */
var editor = null;

/**
 * The delimiter we're using to trigger @mentions. Defaults to @.
 * @type {String}
 */
var delimiter = '@';

/**
 * Checks if we're currently focused on @mention lookup with bound event handlers.
 * @type {Boolean}
 */
var isFocused = false;

/**
 * The Redux store for handling lookups, mentions and tracking.
 * @type {Object}
 */
var store = null;

function initializePlugin(reduxStore, dataSource) {
  var delimiterConfig = arguments.length <= 2 || arguments[2] === undefined ? delimiter : arguments[2];

  (0, _invariant2['default'])(reduxStore, 'Plugin must be initialized with a Redux store.');

  (0, _invariant2['default'])(dataSource, 'Plugin must be initialized with a dataSource.  Datasource can be an array or promise.');

  return new Promise(function (resolve, reject) {

    if (typeof window.tinymce === 'undefined') {
      return reject('Error initializing Mention plugin: `tinymce` is undefined.');
    }

    window.tinymce.create('tinymce.plugins.Mention', {

      /**
       * Callback when the Editor has been registered and is ready
       * to accept plugin initialization.
       * @param  {Object} editor The editor
       */
      init: function init(activeEditor) {
        editor = activeEditor;
        store = Object.freeze(reduxStore);
        delimiter = Object.freeze(delimiterConfig);

        // If promise, wait for it to resolve before resolving the
        // outer promise and initializing the app.
        if (typeof dataSource.then === 'function') {

          dataSource.then(function (response) {
            resolve({
              editor: editor,
              resolvedDataSource: response.data
            });

            start();
          })['catch'](function (error) {
            throw new Error(error);
          });
        } else {
          resolve({
            editor: editor,
            resolvedDataSource: dataSource
          });

          start();
        }
      }
    });

    window.tinymce.PluginManager.add('mention', window.tinymce.plugins.Mention);
  });
}

function start() {
  editor.on('keypress', handleTopLevelEditorInput);
  editor.on('keyup', handleEditorBackspace);
}

/**
 * Add persistent top-level listener for delegating handlers for
 * binding and unbinding events related to UI interaction / querying.
 * @param  {jQuery.Event} event
 */
function handleTopLevelEditorInput(event) {
  var character = String.fromCharCode((0, _mentionUtilsGetKeyCode2['default'])(event));
  var delimiterIndex = delimiter.indexOf(character);

  // User has typed `@`; begin tracking
  if (delimiterIndex > -1 && (0, _mentionUtilsTinyMCEUtils.prevCharIsSpace)(editor)) {
    !isFocused && startListeningForInput();

    // User has exited mentions, stop tracking
  } else if ((0, _mentionUtilsTinyMCEUtils.prevCharIsSpace)(editor) || character === ' ') {
      isFocused && stopListeningAndCleanup();
    }
}

function startListeningForInput() {
  if (toggleFocus()) {
    editor.on('keydown', handleKeyPress);
  }
}

function stopListeningAndCleanup() {
  if (!toggleFocus()) {
    store.dispatch((0, _mentionActionsMentionActions.resetQuery)());
    editor.off('keydown', handleKeyPress);
  }
}

/**
 * Validates input and checks to see if any intermediate actions should
 * be performed.
 *
 * @param  {Number} keyCode The current key being pressed
 * @param  {jQuery.Event} event
 * @return {Function}
 */
function performIntermediateActions(keyCode, event) {
  Object.keys(keyMap).forEach(function (key) {
    var keyValue = keyMap[key];

    // Override default behavior if we're using anything from our keyMap.
    if (keyCode === keyValue && keyValue !== keyMap.BACKSPACE) {
      event.preventDefault();
    }
  });

  return shouldSelectOrMove(keyCode);
}

function shouldSelectOrMove(keyCode) {
  switch (keyCode) {
    case keyMap.TAB:
      return store.dispatch((0, _mentionActionsMentionActions.select)());
    case keyMap.ENTER:
      return store.dispatch((0, _mentionActionsMentionActions.select)());
    case keyMap.DOWN:
      return store.dispatch((0, _mentionActionsMentionActions.moveDown)());
    case keyMap.UP:
      return store.dispatch((0, _mentionActionsMentionActions.moveUp)());
    default:
      return false;
  }
}

function isNearMention(content) {
  var re = /@\w+\b(?! *.)/;
  return re.exec(content);
}

function removeMentionFromEditor(mentionNode) {
  var mention = mentionNode.innerText.replace(/(?:@|_)/g, ' ').trim();

  (0, _domRemove2['default'])(mentionNode);

  return mention;
}

/**
 * Handler for internal key-presses. Parses the input and dispatches
 * queries back to the store for list view and selection.
 * @param  {jQuery.Event} event
 */
function handleKeyPress(event) {
  var keyCode = (0, _mentionUtilsGetKeyCode2['default'])(event);

  if (performIntermediateActions(keyCode, event)) {
    return false;
  };

  setTimeout(function () {
    var content = (0, _mentionUtilsTinyMCEUtils.getEditorContent)(editor);

    if (isNearMention(content)) {
      var mention = (0, _mentionUtilsLast2['default'])(_twitterText2['default'].extractMentionsWithIndices(content));

      if (mention && isFocused) {
        store.dispatch((0, _mentionActionsMentionActions.query)(mention.screenName));
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
  var keyCode = (0, _mentionUtilsGetKeyCode2['default'])(event);

  if (keyCode === keyMap.BACKSPACE) {
    var foundMentionNode = (0, _domClosest2['default'])(editor.selection.getNode(), '.mention');

    if (foundMentionNode) {
      var mention = removeMentionFromEditor(foundMentionNode);
      store.dispatch((0, _mentionActionsMentionActions.remove)(mention));
    } else if (!(0, _mentionUtilsTinyMCEUtils.getEditorContent)(editor).trim().length) {
      store.dispatch((0, _mentionActionsMentionActions.resetMentions)());
    }
  }
}

function toggleFocus() {
  return isFocused = !isFocused;
}

// Export methods for testing
var testExports = {
  _performIntermediateActions: performIntermediateActions,
  _isNearMention: isNearMention,
  _removeMentionFromEditor: removeMentionFromEditor,
  _handleKeyPress: handleKeyPress,
  _handleEditorBackspace: handleEditorBackspace
};
exports.testExports = testExports;
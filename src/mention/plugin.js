import invariant from 'invariant';
import twitter from 'twitter-text';
import closest from 'dom-closest';
import removeNode from 'dom-remove';
import last from 'mention/utils/last';
import getKeyCode from 'mention/utils/getKeyCode';

import {
  getEditorContent,
  prevCharIsSpace
} from 'mention/utils/tinyMCEUtils';

import {
  moveDown,
  moveUp,
  query,
  remove,
  resetMentions,
  resetQuery,
  select
} from 'mention/actions/mentionActions';

const keyMap = {
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
let editor = null;

/**
 * The delimiter we're using to trigger @mentions. Defaults to @.
 * @type {String}
 */
let delimiter = '@';

/**
 * Checks if we're currently focused on @mention lookup with bound event handlers.
 * @type {Boolean}
 */
let isFocused = false;

/**
 * The Redux store for handling lookups, mentions and tracking.
 * @type {Object}
 */
let store = null;


export function initializePlugin(reduxStore, dataSource, delimiterConfig = delimiter) {

  invariant(reduxStore,
    'Plugin must be initialized with a Redux store.'
  );

  invariant(dataSource,
    'Plugin must be initialized with a dataSource.  Datasource can be an array or promise.'
  );

  return new Promise((resolve, reject) => {

    if (typeof window.tinymce === 'undefined') {
      return reject('Error initializing Mention plugin: `tinymce` is undefined.');
    }

    window.tinymce.create('tinymce.plugins.Mention', {

      /**
       * Callback when the Editor has been registered and is ready
       * to accept plugin initialization.
       * @param  {Object} editor The editor
       */
      init(activeEditor) {
        editor = activeEditor;
        store = Object.freeze(reduxStore);
        delimiter = Object.freeze(delimiterConfig);

        // If promise, wait for it to resolve before resolving the
        // outer promise and initializing the app.
        if (typeof dataSource.then === 'function') {

          dataSource.then(response => {
            resolve({
              editor,
              resolvedDataSource: response.data
            });

            start();
          }).catch(error => {
            throw new Error(error);
          });

        } else {
          resolve({
            editor,
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
  const character = String.fromCharCode(getKeyCode(event));
  const delimiterIndex = delimiter.indexOf(character);

  // User has typed `@`; begin tracking
  if (delimiterIndex > -1 && prevCharIsSpace(editor)) {
    !isFocused && startListeningForInput();

  // User has exited mentions, stop tracking
  } else if (prevCharIsSpace(editor) || character === ' ') {
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
    store.dispatch(resetQuery());
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
  Object.keys(keyMap).forEach(key => {
    const keyValue = keyMap[key];

    // Override default behavior if we're using anything from our keyMap.
    if (keyCode === keyValue && keyValue !== keyMap.BACKSPACE) {
      event.preventDefault();
    }
  });

  return shouldSelectOrMove(keyCode);
}

function shouldSelectOrMove(keyCode) {
  switch(keyCode) {
  case keyMap.TAB:
    return store.dispatch(select());
  case keyMap.ENTER:
    return store.dispatch(select());
  case keyMap.DOWN:
    return store.dispatch(moveDown());
  case keyMap.UP:
    return store.dispatch(moveUp());
  default:
    return false;
  }
}

function isNearMention(content) {
  const re = /@\w+\b(?! *.)/;
  return re.exec(content);
}

function removeMentionFromEditor(mentionNode) {
  const mention = mentionNode
    .innerText
    .replace(/(?:@|_)/g, ' ')
    .trim();

  removeNode(mentionNode);

  return mention;
}

/**
 * Handler for internal key-presses. Parses the input and dispatches
 * queries back to the store for list view and selection.
 * @param  {jQuery.Event} event
 */
function handleKeyPress(event) {
  const keyCode = getKeyCode(event);

  if (performIntermediateActions(keyCode, event)) {
    return false;
  };

  setTimeout(() => {
    const content = getEditorContent(editor);

    if (isNearMention(content)) {
      const mention = last(twitter.extractMentionsWithIndices(content));

      if (mention && isFocused) {
        store.dispatch(query(mention.screenName));
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
  const keyCode = getKeyCode(event);

  if (keyCode === keyMap.BACKSPACE) {
    const foundMentionNode = closest(editor.selection.getNode(), '.mention');

    if (foundMentionNode) {
      const mention = removeMentionFromEditor(foundMentionNode)
      store.dispatch(remove(mention));
    } else if (!getEditorContent(editor).trim().length) {
      store.dispatch(resetMentions());
    }
  }
}

function toggleFocus() {
  return isFocused = !isFocused;
}

// Export methods for testing
export const testExports = {
  _performIntermediateActions: performIntermediateActions,
  _isNearMention: isNearMention,
  _removeMentionFromEditor: removeMentionFromEditor,
  _handleKeyPress: handleKeyPress,
  _handleEditorBackspace: handleEditorBackspace,
};

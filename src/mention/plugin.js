import invariant from 'invariant';
import twitter from 'twitter-text';
import closest from 'dom-closest';
import removeNode from 'dom-remove';
import last from 'mention/utils/last';
import { prevCharIsSpace } from 'mention/utils/tinyMCEUtils';

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
var editor = null;

/**
 * The delimiter we're using to trigger @mentions. Defaults to @.
 * @type {String}
 */
var delimiter = '@';

/**
 * Checks if we're currently focused on @mention lookup.
 * @type {Boolean}
 */
var isFocused = false;

/**
 * The Redux store for handling lookups, mentions and tracking.
 * @type {Object}
 */
var store = null;


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
      init(ed) {
        editor = ed;
        store = reduxStore;
        delimiter = delimiterConfig;

        // Check if we're using a promise the dataSource or a
        // raw array.  If promise, wait for it to resolve before
        // resolving the outer promise and initializing the app.
        if (typeof dataSource.then === 'function') {

          // TODO: Implement promise-based lookup
          resolve(editor);
        } else {
          resolve(editor);
        }

        // Add persistent top-level listener for delegating events related
        // to binding and unbinding events related to the UI / querying.
        editor.on('keypress', function(event) {
          const character = String.fromCharCode(event.which || event.keyCode);
          const delimiterIndex = delimiter.indexOf(character);

          // User has typed `@`; begin tracking
          if (delimiterIndex > -1 && prevCharIsSpace(editor)) {
            if (!isFocused) {
              startListeningForInput();
            }

          // User has exited mentions, stop tracking
          } else if (prevCharIsSpace(editor) || character === ' ') {
            if (isFocused) {
              cleanup();
            }
          }
        });

        editor.on('keyup', handleBackspaceKey);
      }
    });

    window.tinymce.PluginManager.add('mention', window.tinymce.plugins.Mention);
  });
}


/**
 * Initializes the MentionPlugin once a user has typed the delimiter.
 *
 * @return {MentionPlugin}
 */
function startListeningForInput() {
  if (toggleFocus()) {
    addEventListeners();
  }
}

/**
 * Cleans up all event listeners and de-initializes plugin. Triggered
 * when outer listener detects a literal ' ' in entry, signifying
 * that we've exited the @mention lookup.
 */
function cleanup() {
  if (!toggleFocus()) {
    store.dispatch(resetQuery());
    removeEventListeners();
  }
}

function addEventListeners() {
  editor.on('keydown', handleKeyPress);
}

function removeEventListeners() {
  editor.off('keydown', handleKeyPress);
}

function toggleFocus() {
  return isFocused = !isFocused;
}

function performIntermediateActions(keyCode, event) {

  // Override default behavior if we're using anything from our keyset.
  Object.keys(keyMap).forEach(key => {
    const keyValue = keyMap[key];
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

// Only matches @ if cursor is inside or around; e.g. "hello @jim and [@chri|s]".
function isNearMention(content) {
  const re = /@\w+\b(?! *.)/;
  return re.exec(content);
}

function getKeyCode(event) {
  return event.which || event.keyCode;
}

function removeMention(mentionNode) {
  const mention = mentionNode
    .innerText
    .replace(/(?:@|_)/g, ' ')
    .trim();

  store.dispatch(remove(mention));

  // Remove @mention node from editor
  removeNode(mentionNode);

  return mentionNode;
}

function getEditorContent(format = 'text') {
  return editor.getContent({
    format
  });
}

/**
 * Handler for internal key-presses. Parses the input and dispatches
 * queries back to the store for list view and selection.
 *
 * @param  {jQuery.Event}
 */
function handleKeyPress(event) {
  const keyCode = getKeyCode(event);

  if (performIntermediateActions(keyCode, event)) {
    return false;
  };

  setTimeout(() => {
    const content = getEditorContent();

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
 *
 * @param  {jQuery.Event}
 */
function handleBackspaceKey(event) {
  const keyCode = event.which || event.keyCode;

  if (keyCode === keyMap.BACKSPACE) {
    const foundMentionNode = closest(editor.selection.getNode(), '.mention');

    if (foundMentionNode) {
      removeMention(foundMentionNode);
    } else if (!getEditorContent().trim().length) {
      store.dispatch(resetMentions());
    }
  }
}

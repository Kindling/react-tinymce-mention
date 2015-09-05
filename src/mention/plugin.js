import invariant from 'invariant';
import twitter from 'twitter-text';
import closest from 'dom-closest';
import removeNode from 'dom-remove';
import findWhere from 'lodash.findwhere';
import getKeyCode from './utils/getKeyCode';

import {
  collectMentionIds,
  getEditorContent,
  getLastChar,
} from './utils/tinyMCEUtils';

import {
  moveDown,
  moveUp,
  query,
  remove,
  resetMentions,
  resetQuery,
  select,
  syncEditorState
} from './actions/mentionActions';

const keyMap = {
  BACKSPACE: 8,
  DOWN: 40,
  ENTER: 13,
  TAB: 9,
  UP: 38,
  ESC: 27
};

let editor;
let delimiter = '@';
let store;

const focus = {
  active: false,

  toggle() {
    return this.active = !this.active;
  }
};

/**
 * Tracks typed characters after `@ment|`.  Allows us to determine if we
 * are within a mention when `focus.active`
 */
const typedMention = {
   value: '',

   update(str) {
     this.value = (this.value + str).trim();
     return this.value;
   },
   backspace() {
     const val = this.value;
     this.value = val.substring(0, val.length - 1).trim();
     return this.value;
   },
   clear() {
     this.value = '';
   }
 };

export function initializePlugin(reduxStore, dataSource, delimiterConfig = delimiter) {

  invariant(reduxStore,
    'Plugin must be initialized with a Redux store.'
  );

  invariant(dataSource,
    'Plugin must be initialized with a dataSource.  Datasource can be an array or promise.'
  );

  store = reduxStore;
  delimiter = delimiterConfig;

  return new Promise((resolve, reject) => {

    if (typeof window.tinymce === 'undefined') {
      return reject('Error initializing Mention plugin: `tinymce` is undefined.');
    }

    function loadMentionData() {

      // If promise, wait for it to resolve before resolving the
      // outer promise and initializing the app.
      if (typeof dataSource.then === 'function') {
        dataSource.then(response => {
          setTimeout(start, 100); // FF fix
          resolve({ editor, resolvedDataSource: response });
        });

        // Spec-compliant promise
        if (dataSource.catch === 'function') {
          dataSource.catch(error => {
            throw new Error(error);
          });

        // jQuery
        } else if (dataSource.fail === 'function') {
          dataSource.fail(error => {
            throw new Error(error);
          });
        }
      } else {
        setTimeout(start, 100);
        resolve({ editor, resolvedDataSource: dataSource });
      }
    }

    if (!pluginInitialized()) {
      window.tinymce.PluginManager.add('mention', (activeEditor) => {
        editor = activeEditor;
        loadMentionData();
      });
    } else {
      loadMentionData();
    }

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

function handleTopLevelEditorInput(event) {
  const keyCode = getKeyCode(event);
  const character = String.fromCharCode(keyCode);
  const delimiterIndex = delimiter.indexOf(character);

  normalizeEditorInput();

  if (!focus.active && delimiterIndex > -1) {
    startListeningForInput();
  } else if (!focus.active || character === ' ') {
    stopListeningAndCleanup();
  }
}

function handleTopLevelActionKeys(event) {
  const keyCode = getKeyCode(event);

  if (focus.active && keyCode === keyMap.BACKSPACE) {
    if (getLastChar(editor) === delimiter){
      stopListeningAndCleanup();
    } else {
      const mentionText = updateMentionText(keyCode);
      store.dispatch(query(mentionText));
    }
  }
}

function handleActionKeys(event) {
  const keyCode = getKeyCode(event);

  if (shouldSelectOrMove(keyCode, event)) {
    event.preventDefault();
    return false;
  }
}

function handleKeyPress(event) {
  const keyCode = getKeyCode(event);

  setTimeout(() => {
    const mentionText = updateMentionText(keyCode);

    if (mentionText !== '') {
      const content = getEditorContent(editor);
      const extractedMentions = twitter.extractMentionsWithIndices(content);

      const mention = findWhere(extractedMentions, {
        screenName: mentionText
      });

      if (mention) {
        store.dispatch(query(mention.screenName));
      }
    }
  }, 0);
}

function handleEditorBackspace(event) {
  const keyCode = getKeyCode(event);
  const mentionClassName = '.tinymce-mention';

  if (keyCode === keyMap.BACKSPACE) {
    const foundMentionNode = closest(editor.selection.getNode(), mentionClassName);

    // Remove single
    if (foundMentionNode) {
      const mention = removeMentionFromEditor(foundMentionNode);
      store.dispatch(remove(mention));

    // Remove all mentions
    } else if (!getEditorContent(editor).trim().length) {
      store.dispatch(resetMentions());
      stopListeningAndCleanup();

    // Sync
    } else {
      const mentionIds = collectMentionIds(editor, mentionClassName);
      store.dispatch(syncEditorState(mentionIds));
    }
  }
}

function shouldSelectOrMove(keyCode, event) {
  const { matchedSources } = store.getState().mention;

  if (matchedSources.length) {
    if (keyCode === keyMap.BACKSPACE) {
      typedMention.update(keyCode);
      return handleKeyPress(event);
    }

    switch(keyCode) {
    case keyMap.TAB:
      selectMention();
      return true;
    case keyMap.ENTER:
      selectMention();
      return true;
    case keyMap.DOWN:
      store.dispatch(moveDown());
      return true;
    case keyMap.UP:
      store.dispatch(moveUp());
      return true;
    case keyMap.ESC:
      stopListeningAndCleanup();
      return true;
    default:
      return false;
    }
  }
}

function startListeningForInput() {
  if (focus.toggle()) {
    editor.on('keydown', handleActionKeys);
    editor.on('keypress', handleKeyPress);
  }
}

function stopListeningAndCleanup() {
  if (focus.active) {
    focus.toggle();
  }

  typedMention.clear();
  store.dispatch(resetQuery());
  editor.off('keydown', handleActionKeys);
  editor.off('keypress', handleKeyPress);
}

function updateMentionText(keyCode) {
  const mentionText = keyCode !== keyMap.BACKSPACE
    ? typedMention.update(getLastChar(editor))
    : typedMention.backspace();

  return mentionText;
}

function selectMention() {
  store.dispatch(select());
  typedMention.clear();
  stopListeningAndCleanup();
  return true;
}

function extractMentionFromNode(mentionNode) {
  return mentionNode
    .innerHTML
    .replace(/(?:@|_)/g, '')
    .trim();
}

function removeMentionFromEditor(mentionNode) {
  removeNode(mentionNode);
  return extractMentionFromNode(mentionNode);
}

function normalizeEditorInput() {

  // Force a root element in case one doesn't exist.
  if (editor.getContent() === '') {
    editor.insertContent(' ');
  }
}

function pluginInitialized() {
  const ed = window.tinymce.activeEditor;
  const plugins = ed && ed.plugins;
  const mention = plugins && plugins.mention;
  return mention ? true : false;;
}

// Export methods for testing
export const testExports = {
  _handleKeyPress: handleKeyPress,
  _handleEditorBackspace: handleEditorBackspace,
  _removeMentionFromEditor: removeMentionFromEditor,
  _extractMentionFromNode: extractMentionFromNode
};

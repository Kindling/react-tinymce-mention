import invariant from 'invariant';
import removeNode from 'dom-remove';
import findWhere from 'lodash.findwhere';
import getKeyCode from './utils/getKeyCode';
import extractMentions from './utils/extractMentions';

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

const delimiters = ['@', '#'];

var delimiter = '@';
var editor, store;

const focus = {
  active: false,

  toggle() {
    this.active = !this.active;
    return this.active;
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


export function initializePlugin(reduxStore, dataSource, delimiterValue) {

  if (typeof window.tinymce === 'undefined') {
    throw new Error('Error initializing Mention plugin: `tinymce` is undefined.');
  }

  return new Promise((resolve, reject) => {

    if (pluginInitialized()) {
      loadMentions(dataSource, resolve, reject);
    } else {
      window.tinymce.PluginManager.add('mention', (activeEditor) => {

        invariant(reduxStore,
          'Plugin must be initialized with a Redux store.'
        );

        invariant(dataSource,
          'Plugin must be initialized with a `dataSource` that is an array or promise.'
        );

        invariant(isValidDelimiter(delimiterValue),
          `Plugin must be initialized with a valid delimiter (${delimiters.toString()})`
        );

        store = reduxStore;
        delimiter = delimiterValue;
        editor = activeEditor;

        loadMentions(dataSource, resolve, reject);
      });
    }
  });
}

function loadMentions(dataSource, resolve) {
  setTimeout(() => {
    if (typeof dataSource.then === 'function') {
      dataSource.then(response => {
        start();
        resolve({
          editor,
          resolvedDataSource: response
        });
      });

      if (dataSource.catch === 'function') {
        dataSource.catch(error => {
          throw new Error(error);
        });
      } else if (dataSource.fail === 'function') {
        dataSource.fail(error => {
          throw new Error(error);
        });
      }
    } else {
      start();
      resolve({
        editor,
        resolvedDataSource: dataSource
      });
    }
  }, 50);
}

function start() {
  const delay = 100; // FireFox fix

  // IE fix against loss of cursor position when immediately
  // inserting an @mention into the editor.
  if (window.tinymce.isIE) {
    editor.insertContent('&nbsp;');
  }

  setTimeout(() => {
    stop();

    editor.on('keypress', handleTopLevelEditorInput);
    editor.on('keydown', handleTopLevelActionKeys);
    editor.on('keyup', handleBackspace);
  }, delay);
}

function stop() {
  editor.off();
}

function handleTopLevelEditorInput(event) {
  const keyCode = getKeyCode(event);
  const character = String.fromCharCode(keyCode);
  const foundDelimiter = delimiter.indexOf(character) > -1;

  normalizeEditorInput(editor);

  if (!focus.active && foundDelimiter) {
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
  const isLoading = store.getState().mention.loading;

  if (!isLoading) {
    if (shouldSelectOrMove(keyCode, event)) {
      event.preventDefault();
      return false;
    }
  }
}

function handleKeyPress(event) {
  const keyCode = getKeyCode(event);

  setTimeout(() => {
    const mentionText = updateMentionText(keyCode);

    if (mentionText !== '') {
      const content = getEditorContent(editor);
      const { mentions, prop } = extractMentions(content, delimiter);

      const mention = findWhere(mentions, {
        [prop]: mentionText
      });

      if (mention) {
        store.dispatch(query(mention[prop]));
      }
    }
  }, 0);
}

function handleBackspace(event) {
  const keyCode = getKeyCode(event);
  const mentionClassName = '.tinymce-mention';
  const $ = window.tinymce.dom.DomQuery;

  if (keyCode === keyMap.BACKSPACE) {
    const node = editor.selection.getNode();

    const el = window.tinymce.isIE
      ? node.firstElementChild
      : node;

    const foundMentionNode = $(el).closest(mentionClassName)[0];

    if (foundMentionNode) {
      const mention = removeMentionFromEditor(foundMentionNode);
      store.dispatch(remove(mention));

    } else if (!editor.getContent({format: 'html'}).trim().length) {
      store.dispatch(resetMentions());
      stopListeningAndCleanup();

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
  if (!focus.active) {
    focus.toggle();

    editor.on('keydown', handleActionKeys);
    editor.on('keypress', handleKeyPress);
  }
}

function stopListeningAndCleanup() {
  if (focus.active) {
    focus.toggle();
    typedMention.clear();
    store.dispatch(resetQuery());
    editor.off('keydown', handleActionKeys);
    editor.off('keypress', handleKeyPress);
  }
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

function extractMentionFromNode(mentionNode, delimiter) {
  const re = new RegExp('(?:' + delimiter + '|_)', 'g');
  return mentionNode
    .innerHTML
    .replace(re, '')
    .trim();
}

function removeMentionFromEditor(mentionNode) {
  removeNode(mentionNode);
  return extractMentionFromNode(mentionNode, delimiter);
}

// TODO: Cleanup
// Force a root element in case one doesn't exist.
function normalizeEditorInput() {
  if (editor.getContent() === '' || editor.getContent({ format: 'raw' }) === '<br>') {
    editor.insertContent(' ');
  }
}

function pluginInitialized() {
  const ed = window.tinymce.activeEditor;
  const plugins = ed && ed.plugins;
  const mention = plugins && plugins.mention;
  return mention ? true : false;
}

function isValidDelimiter(delimiter) {
  return delimiters.some(d => d === delimiter);
}

// Export methods for testing
export const testExports = {
  _typedMention: typedMention,
  _focus: focus,
  _loadMentions: loadMentions,
  _shouldSelectOrMove: shouldSelectOrMove,
  _updateMentionText: updateMentionText,
  _normalizeEditorInput: normalizeEditorInput,
  _isValidDelimiter: isValidDelimiter,

  _handleKeyPress: handleKeyPress,
  _handleEditorBackspace: handleBackspace,
  _removeMentionFromEditor: removeMentionFromEditor,
  _extractMentionFromNode: extractMentionFromNode
};

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { initializePlugin } from 'mention/plugin';
import mentionReducer from 'mention/reducers/mentionReducer';
import dataSourceStatic from 'mention/reducers/__test__/fixtures/dataSourceStatic';
import initializeEditor from './fixtures/initializeEditor';
import { setEditor } from 'mention/actions/mentionActions';

fdescribe('TinyMCE Plugin', () => {

  var store;

  const keyCodes = {
    '@': 64,

    'c': 67,
    'h': 72,
    'r': 82,
    'i': 73,
    's': 83,

    'k': 75,
    'a': 65,
    't': 84,
    'y': 89
  }

  const getEditor = () => store.getState().editor;
  const getPlugin = () => window.mentionPlugin;
  const getState = () => window.mentionPlugin.store.getState().mention;

  beforeEach((done) => {
    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

    store = createStoreWithMiddleware(mentionReducer, {
      dataSource: dataSourceStatic,
      highlightIndex: 0,
      mentions: [],
      query: ''
    });

    initializeEditor();
    initializePlugin(store, [], '@');

    setTimeout(() => {
      store.dispatch(setEditor(window.tinymce.activeEditor));
      done();
    }, 0);
  });

  it('should add keyboard event listeners', () => {
    expect(getEditor().hasEventListeners('keypress')).toBe(true);
    expect(getEditor().hasEventListeners('keyup')).toBe(true);
  });

  fit('should start tracking input if delimiter pressed', () => {
    const editor = getEditor();

    editor.fire('keypress', {
      keyCode: keyCodes['@']
    });

    expect(editor.hasEventListeners('keydown')).toBe(true);

    ['c', 'h', 'r', 'i', 's'].forEach((key) => {
      editor.fire('keydown', {
        keyCode: keyCodes[key]
      });
    })

    expect(getState().query).toBe('chris');

  });

  it('should stop tracking input if prev char is space', () => {

  });

  it('should stop tracking input if prev char is empty', () => {

  });

  it('should match closest @mention when backspace is pressed', () => {

  });

});

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { initializePlugin } from 'mention/plugin';
import mentionReducer from 'mention/reducers/mentionReducer';
import dataSourceStatic from 'mention/reducers/__test__/fixtures/dataSourceStatic';
import initializeEditor from './fixtures/initializeEditor';
import { query, resetQuery, select, setEditor } from 'mention/actions/mentionActions';

fdescribe('TinyMCE Plugin', () => {

  var store;

  const miscKeyCodes = {
    'backspace': 8
  }

  function getKeyCode(character) {
    return character.charCodeAt(0);
  }

  function getEditor() {
    return store.getState().editor;
  }

  function getPlugin() {
    return window.mentionPlugin;
  }

  function getState() {
    return store.getState();
  }

  beforeEach((done) => {
    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

    store = createStoreWithMiddleware(mentionReducer, {
      dataSource: dataSourceStatic,
      highlightIndex: 0,
      mentions: [],
      query: ''
    });

    initializeEditor();
    initializePlugin(store, dataSourceStatic, '@');

    setTimeout(() => {
      getPlugin().store = store;
      store.dispatch(setEditor(window.tinymce.activeEditor));
      done();
    }, 0);
  });

  afterEach(() => {
    store.dispatch(resetQuery());
    window.tinymce.remove();
    React.unmountComponentAtNode(document.getElementById('root'));
  })

  it('should add keyboard event listeners', () => {
    expect(getEditor().hasEventListeners('keypress')).toBe(true);
    expect(getEditor().hasEventListeners('keyup')).toBe(true);
  });

  it('should start tracking input if delimiter pressed', () => {
    const editor = getEditor();

    editor.fire('keypress', {
      keyCode: getKeyCode('@')
    });

    expect(editor.hasEventListeners('keydown')).toBe(true);

    ['c', 'h', 'r', 'i', 's'].forEach((key) => {
      editor.fire('keydown', {
        keyCode: getKeyCode(key)
      });
    })

    expect(getState().query).toBe('chris');
  });

  it('should stop tracking input if prev char is space', () => {
    const editor = getEditor();

    // Start listening for input
    editor.fire('keypress', {
      keyCode: getKeyCode('@')
    });

    ['c', 'h', 'r', 'i', 's'].forEach((key) => {
      editor.fire('keydown', {
        keyCode: getKeyCode(key)
      });
    })

    expect(getState().query).toBe('chris');

    // Add space, unbind listeners
    editor.fire('keydown', {
      keyCode: getKeyCode(' ')
    });

    expect(getState().query).toBe('');

    // Test further input
    ['c', 'h', 'r', 'i', 's'].forEach((key) => {
      editor.fire('keydown', {
        keyCode: getKeyCode(key)
      });
    })

    expect(getState().query).toBe('');
  });

  fit('should match closest @mention when backspace is pressed', () => {
    const initial = '@chris';
    const editor = getEditor();
    store.dispatch(query(initial.replace('@', '')));
    store.dispatch(select())
    editor.setContent(initial);

    expect(getState().mentions).toEqual(['chris pappas']);

    editor.fire('keyup', {
      keyCode: miscKeyCodes.backspace
    });

    expect(getState().mentions).toEqual([]);
  });

});

import _ from 'lodash-node';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { initializePlugin } from 'mention/plugin';
import mentionReducer from 'mention/reducers/mentionReducer';
import dataSourceStatic from 'mention/reducers/__test__/fixtures/dataSourceStatic';
import initializeEditor from './fixtures/initializeEditor';
import { query, resetQuery, select, finalizeSetup } from 'mention/actions/mentionActions';
import { removeMention } from 'mention/utils/tinyMCEUtils';

describe('TinyMCE Plugin', () => {
  var store;

  const miscKeyCodes = {
    'backspace': 8
  }

  const getKeyCode = (character) => character.charCodeAt(0);
  const getEditor = () => store.getState().editor;
  const getPlugin = () => window.mentionPlugin;
  const getState = () => store.getState();

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
      store.dispatch(finalizeSetup(window.tinymce.activeEditor, dataSourceStatic));
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

    expect(getPlugin().isFocused).toBe(true);
  });

  it('should stop tracking input if prev char is space', () => {
    const editor = getEditor();

    // Start listening for input
    editor.fire('keypress', {
      keyCode: getKeyCode('@')
    });

    expect(getPlugin().isFocused).toBe(true);

    // Add space, unbind listeners
    editor.fire('keypress', {
      keyCode: getKeyCode(' ')
    });

    expect(getPlugin().isFocused).toBe(false);
  });

  // it('should match closest @mention when backspace is pressed', () => {
  //   const initial = 'hello, how are you @chris ';
  //   const editor = getEditor();
  //
  //   editor.setContent(initial);
  //   store.dispatch(query('chris'));
  //   store.dispatch(select())
  //   expect(getState().mentions).toEqual(['chris_pappas']);
  //
  //   // Ensure we're inside of the matched Mention
  //   // with a cursor position like `@chri|s`
  //   _.times(2, () => {
  //     editor.fire('keyup', {
  //       keyCode: miscKeyCodes.backspace
  //     });
  //   });
  //
  //   expect(getState().mentions).toEqual([]);
  //
  //   // And content should backespace until last `@`
  //   expect(editor.getContent({ format: 'text' }))
  //     .toEqual(initial.replace('@chris', '@').trim())
  // });

});

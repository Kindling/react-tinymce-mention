import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { initializePlugin } from 'mention/plugin';
import mentionReducer from 'mention/reducers/mentionReducer';
import dataSourceStatic from 'mention/reducers/__test__/fixtures/dataSourceStatic';
import initializeEditor from './fixtures/initializeEditor';
import { setEditor } from 'mention/actions/mentionActions';

describe('TinyMCE Plugin', () => {

  var store;

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
    initializePlugin(store, [], '@');

    setTimeout(() => {
      store.dispatch(setEditor(window.tinymce.activeEditor));
      done();
    }, 0);
  });

  fit('should initialize with correct parameters', () => {
    // console.log(getState());
  });

  it('should add keyboard event listeners', () => {

  });

  it('should listen for input', () => {

  });

  it('should listen for backspace', () => {

  });

  it('should start tracking input if delimiter pressed', () => {

  });

  it('should stop tracking input if prev char is space', () => {

  });

  it('should stop tracking input if prev char is empty', () => {

  });

  it('should match closest @mention when backspace is pressed', () => {

  });

});

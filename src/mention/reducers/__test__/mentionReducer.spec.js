import { createStore } from 'redux';
import mentionReducer from 'mention/reducers/mentionReducer';
import dataSource from './fixtures/dataSource';

import {
  moveDown,
  moveUp,
  query,
  // resetQuery,
  // select,
  // setEditor
} from 'mention/actions/mentionActions';

describe('mentionReducer', () => {

  var store;

  const getState = () => store.getState();

  beforeEach(() => {
    store = createStore(mentionReducer, {
      dataSource,
      highlightIndex: 0,
      query: ''
    });
  });

  fit('should update the current lookup query', () => {
    store.dispatch(query('hello'));
    expect(getState().query).toBe('hello');
  });

  it('should reset the lookup query', () => {

  });

  it('should select the currently selected item', () => {

  });

  it('set the editor', () => {

  });

  it('should move the highlighter down', () => {
    store.dispatch(moveDown());
    expect(getState().highlightIndex).toBe(1);
    store.dispatch(moveDown());
    store.dispatch(moveDown());
    expect(getState().highlightIndex).toBe(3);
    store.dispatch(moveDown());
    expect(getState().highlightIndex).toBe(0);
  });

  it('should move the highlighter up', () => {
    store.dispatch(moveUp());
    expect(getState().highlightIndex).toBe(3);
    store.dispatch(moveUp());
    store.dispatch(moveUp());
    expect(getState().highlightIndex).toBe(1);
    store.dispatch(moveUp());
    expect(getState().highlightIndex).toBe(0);
  });

});

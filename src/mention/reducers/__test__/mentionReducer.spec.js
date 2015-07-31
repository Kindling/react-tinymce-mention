import { createStore } from 'redux';
import mentionReducer from 'mention/reducers/mentionReducer';
import dataSourceStatic from './fixtures/dataSourceStatic';
// import dataSourceAsync from './fixtures/dataSourceAsync';

import {
  moveDown,
  moveUp,
  query,
  resetQuery,
  select,
  // setEditor
} from 'mention/actions/mentionActions';

describe('mentionReducer', () => {

  var store;

  const getState = () => store.getState();

  beforeEach(() => {
    store = createStore(mentionReducer, {
      dataSource: dataSourceStatic,
      highlightIndex: 0,
      mentions: [],
      query: ''
    });
  });

  it('should update the current lookup query', () => {
    store.dispatch(query('alex'));
    expect(getState().query).toBe('alex');
    expect(getState().matchedSources).toEqual([
      'alex',
      'alexandra'
    ]);

    store.dispatch(query('chris'));
    expect(getState().matchedSources).toEqual([
      'chris',
      'christopher'
    ]);

    store.dispatch(query(''));
    expect(getState().matchedSources).toEqual([]);

    store.dispatch(query('c'));
    store.dispatch(query('h'));
    store.dispatch(query('r'));
    expect(getState().matchedSources).toEqual([
      'chris',
      'christopher'
    ]);
  });

  it('should reset the lookup query', () => {
    store.dispatch(query('alex'));
    expect(getState().matchedSources).toEqual([
      'alex',
      'alexandra'
    ]);

    store.dispatch(resetQuery('alex'));
    expect(getState().matchedSources).toEqual([]);
  });

  fit('should select the currently selected item', () => {
    store.dispatch(query('k'));

    store.dispatch(moveDown());
    store.dispatch(select());
    expect(getState().selectedItem).toEqual('katherine');

    store.dispatch(moveUp());
    store.dispatch(select());
    expect(getState().selectedItem).toEqual('katy');
  });

  it('should move the highlighter down', () => {
    store.dispatch(query('k'));
    expect(getState().matchedSources).toEqual([
      'katy',
      'katherine',
      'kim',
      'karl'
    ]);

    store.dispatch(moveDown());
    expect(getState().highlightIndex).toBe(1);
    store.dispatch(moveDown());
    store.dispatch(moveDown());
    expect(getState().highlightIndex).toBe(3);
    store.dispatch(moveDown());
    expect(getState().highlightIndex).toBe(0);
  });

  it('should move the highlighter up', () => {
    store.dispatch(query('k'));
    expect(getState().matchedSources).toEqual([
      'katy',
      'katherine',
      'kim',
      'karl'
    ]);

    store.dispatch(moveUp());
    expect(getState().highlightIndex).toBe(3);
    store.dispatch(moveUp());
    store.dispatch(moveUp());
    expect(getState().highlightIndex).toBe(1);
    store.dispatch(moveUp());
    expect(getState().highlightIndex).toBe(0);
  });

  it('set the editor', () => {

  });

});

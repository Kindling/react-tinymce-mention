import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mentionReducer from 'mention/reducers/mentionReducer';
import dataSourceStatic from './fixtures/dataSourceStatic';

import {
  moveDown,
  moveUp,
  query,
  remove,
  resetQuery,
  select,
} from 'mention/actions/mentionActions';

describe('mentionReducer', () => {
  var store;
  const getState = () => store.getState();

  beforeEach(() => {
    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

    store = createStoreWithMiddleware(mentionReducer, {
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
      'alex_gray',
      'alexandra_spell'
    ]);

    store.dispatch(query('chris'));
    expect(getState().matchedSources).toEqual([
      'chris_pappas',
      'christopher_pappas'
    ]);

    store.dispatch(query(''));
    expect(getState().matchedSources).toEqual([]);

    store.dispatch(query('c'));
    store.dispatch(query('h'));
    store.dispatch(query('r'));
    expect(getState().matchedSources).toEqual([
      'chris_pappas',
      'christopher_pappas'
    ]);
  });

  it('should reset the lookup query', () => {
    store.dispatch(query('alex'));
    expect(getState().matchedSources).toEqual([
      'alex_gray',
      'alexandra_spell'
    ]);

    store.dispatch(resetQuery());
    expect(getState().matchedSources).toEqual([]);
  });

  it('should select the currently selected item', () => {
    store.dispatch(query('k'));

    store.dispatch(moveDown());
    store.dispatch(select());
    expect(getState().selectedItem).toEqual('katy_curtis');

    store.dispatch(moveUp());
    store.dispatch(select());
    expect(getState().selectedItem).toEqual('garrett_kalleberg');
  });

  it('should move the highlighter down', () => {
    store.dispatch(query('ka'));
    expect(getState().matchedSources).toEqual([
      'garrett_kalleberg',
      'katy_curtis',
      'katherine_curtis',
      'karl_popper'
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
    store.dispatch(query('ka'));
    expect(getState().matchedSources).toEqual([
      'garrett_kalleberg',
      'katy_curtis',
      'katherine_curtis',
      'karl_popper'
    ]);

    store.dispatch(moveUp());
    expect(getState().highlightIndex).toBe(3);
    store.dispatch(moveUp());
    store.dispatch(moveUp());
    expect(getState().highlightIndex).toBe(1);
    store.dispatch(moveUp());
    expect(getState().highlightIndex).toBe(0);
  });

  it('should remove the selected item if no characters match from query', function() {
    store.dispatch(query('kalleberg'));
    expect(getState().matchedSources).toEqual([
      'garrett_kalleberg'
    ]);

    store.dispatch(select());
    expect(getState().selectedItem).toEqual('garrett_kalleberg');
    expect(getState().mentions).toEqual([
      'garrett_kalleberg'
    ]);

    store.dispatch(query('chris'));
    expect(getState().matchedSources).toEqual([
      'chris_pappas',
      'christopher_pappas'
    ]);

    store.dispatch(moveDown());
    store.dispatch(select());
    expect(getState().mentions).toEqual([
      'garrett_kalleberg',
      'christopher_pappas'
    ]);

    store.dispatch(remove('christopher_pappas'));
    expect(getState().mentions).toEqual([
      'garrett_kalleberg'
    ]);

    store.dispatch(remove('garrett_kalleberg'));
    expect(getState().mentions).toEqual([]);
  });

});

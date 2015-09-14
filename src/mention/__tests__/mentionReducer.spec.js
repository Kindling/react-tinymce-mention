import findWhere from 'lodash.findwhere';
import initializeRedux from '../utils/initializeRedux';
import mentionReducer from '../reducers/mentionReducer';
import simpleDataSource from './fixtures/simple';
import jasmineHelpers from './helpers/jasmineHelpers';
import redux from './helpers/redux';

import {
  moveDown,
  moveUp,
  query,
  remove,
  resetMentions,
  resetQuery,
  select,
} from '../actions/mentionActions';

describe('mentionReducer', () => {
  let { initStore, dataSource, state, find } = redux();
  let store, getState;

  beforeEach(() => {
    jasmineHelpers();

    store = initStore();
    getState = () => state(store);
  });

  it('should update the current lookup query', () => {
    store.dispatch(query('alex'));
    expect(getState().query).toBe('alex'.toUpperCase());
    expect(getState().matchedSources).toDeepEqual([
      find('alex gray'),
      find('alex gutierrez'),
      find('alexandra spell'),
    ]);

    store.dispatch(query('chris'));
    expect(getState().matchedSources).toDeepEqual([
      find('chris pappas'),
      find('christopher pappas'),
    ]);

    store.dispatch(query(''));
    expect(getState().matchedSources).toDeepEqual([]);
  });

  it('should reset the lookup query', () => {
    store.dispatch(query('alex'));
    expect(getState().matchedSources).toDeepEqual([
      find('alex gray'),
      find('alex gutierrez'),
      find('alexandra spell')
    ]);

    store.dispatch(resetQuery());
    expect(getState().matchedSources).toDeepEqual([]);
  });

  it('should select the currently highlighted item', () => {
    store.dispatch(query('ka'));
    store.dispatch(moveDown());
    expect(getState().highlightIndex).toBe(1);
    store.dispatch(moveDown());
    expect(getState().highlightIndex).toBe(2);
    store.dispatch(select());
    expect(getState().mentions).toEqual([
      find('katy curtis')
    ]);
    store.dispatch(query('garrett'));
    store.dispatch(select());
    expect(getState().mentions).toEqual([
      find('katy curtis'),
      find('garrett kalleberg'),
    ]);
  });

  it('should move the highlighter down', () => {
    store.dispatch(query('ka'));
    expect(getState().matchedSources).toDeepEqual([
      find('garrett kalleberg'),
      find('katherine curtis'),
      find('katy curtis')
    ]);

    store.dispatch(moveDown());
    expect(getState().highlightIndex).toBe(1);
    store.dispatch(moveDown());
    store.dispatch(moveDown());
    expect(getState().highlightIndex).toBe(0);
    store.dispatch(moveDown());
    expect(getState().highlightIndex).toBe(1);
  });

  it('should move the highlighter up', () => {
    store.dispatch(query('ka'));
    expect(getState().matchedSources).toDeepEqual([
      find('garrett kalleberg'),
      find('katherine curtis'),
      find('katy curtis')
    ]);

    store.dispatch(moveUp());
    expect(getState().highlightIndex).toBe(2);
    store.dispatch(moveUp());
    store.dispatch(moveUp());
    expect(getState().highlightIndex).toBe(0);
    store.dispatch(moveUp());
    expect(getState().highlightIndex).toBe(2);
  });

  it('should remove the selected item if no characters match from query', function() {
    store.dispatch(query('kalleberg'));
    expect(getState().matchedSources).toDeepEqual([
      find('garrett kalleberg')
    ]);

    store.dispatch(select());
    expect(getState().mentions).toDeepEqual([
      find('garrett kalleberg')
    ]);

    store.dispatch(query('chris'));
    expect(getState().matchedSources).toDeepEqual([
      find('chris pappas'),
      find('christopher pappas')
    ]);

    store.dispatch(moveDown());
    store.dispatch(select());
    expect(getState().mentions).toDeepEqual([
      find('garrett kalleberg'),
      find('christopher pappas')
    ]);

    store.dispatch(remove('christopher pappas'));
    expect(getState().mentions).toDeepEqual([
      find('garrett kalleberg')
    ]);

    store.dispatch(remove('garrett kalleberg'));
    expect(getState().mentions).toDeepEqual([]);
  });

  it('should reset mentions', () => {
    store.dispatch(query('chris'));
    expect(getState().matchedSources).toDeepEqual([
      find('chris pappas'),
      find('christopher pappas'),
    ]);

    store.dispatch(resetMentions());
    expect(getState().mentions).toDeepEqual([]);
    expect(getState().matchedSources).toDeepEqual([]);
    expect(getState().query).toDeepEqual('');
  });

});

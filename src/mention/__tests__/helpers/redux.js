import findWhere from 'lodash.findwhere';
import initializeRedux from '../../utils/initializeRedux';
import mentionReducer from '../../reducers/mentionReducer';
import simpleDataSource from '../fixtures/simple';

export default function initRedux() {
  const dataSource = simpleDataSource.sort().map(source => {
    return {
      searchKey: source,
      displayLabel: source
    };
  });

  const getState = (store) => {
    const state = store.getState().mention;
    state.mentions.forEach(mention => delete mention.tinymceId);
    return state;
  };

  const find = (name) => findWhere(dataSource, { displayLabel: name });

  const initialState = {
    asyncDataSource: false,
    dataSource: dataSource,
    highlightIndex: 0,
    matchedSources: [],
    mentions: [],
    query: ''
  };

  return {
    dataSource,
    find,
    initialState,
    state: getState,
    initStore(state) {
      return initializeRedux({ mention: mentionReducer }, {
        mention: state || initialState
      });
    }
  };
}

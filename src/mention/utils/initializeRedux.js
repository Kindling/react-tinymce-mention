import { createStore, combineReducers, applyMiddleware } from 'redux';
import { batchedUpdatesMiddleware } from 'redux-batched-updates';
import thunk from 'redux-thunk';

export default function initializeRedux(reducers, initialState) {
  const reducer = combineReducers(reducers);
  const createStoreWithMiddleware = applyMiddleware(thunk, batchedUpdatesMiddleware)(createStore);
  return createStoreWithMiddleware(reducer, initialState);
}

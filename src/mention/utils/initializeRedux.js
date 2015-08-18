import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export default function initializeRedux(reducers, initialState) {
  const reducer = combineReducers(reducers);
  const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  return createStoreWithMiddleware(reducer, initialState);
}

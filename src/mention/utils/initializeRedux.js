// import { createRedux, createDispatcher, composeStores } from 'redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export default function initializeRedux(reducers, initialState) {
  const reducer = combineReducers(reducers);
  const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  const store = createStoreWithMiddleware(reducer, initialState);

  return store;
}

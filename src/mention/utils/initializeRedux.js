import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { devTools, persistState } from 'redux-devtools';

export default function initializeRedux(reducers, initialState) {
  const reducer = combineReducers(reducers);
  const isProduction = process.env.NODE_ENV === 'production';

  const finalCreateStore = isProduction
    ? applyMiddleware(thunk)(createStore)
    : compose(
      applyMiddleware(thunk),
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
      createStore
    );

  return finalCreateStore(reducer, initialState);
}

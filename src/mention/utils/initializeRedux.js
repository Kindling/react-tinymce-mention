import { createRedux, createDispatcher, composeStores } from 'redux';
import thunkMiddleware from 'redux/lib/middleware/thunk';

export default function initializeRedux(reducers, initialState) {
  const reducer = composeStores(reducers);

  const dispatcher = createDispatcher( reducer,
    getState => [
      thunkMiddleware(getState)
    ]
  );

  return createRedux(dispatcher, initialState);
}

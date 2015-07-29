import _ from 'lodash-node';

const initialState = {
  hello: 'hi!'
};

const actionsMap = {
  fetchUsers(state, action) {
    return {
      fetched: true
    };
  }
};

export default function searchReducer(state = initialState, action) {
  const reduceFn = actionsMap[_.camelCase(action.type)];

  if (!reduceFn) {
    return state;
  }

  return {
    ...state,
    ...reduceFn(state, action)
  };
}

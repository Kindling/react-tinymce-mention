import _ from 'lodash-node';

const initialState = {
  users: ['chris'],
  testing: 'not working'
};

const actionsMap = {
  fetchUsers(state, action) {
    return {
      users: [
        'jim',
        'alex',
        'chris',
        'katy',
        'sam'
      ]
    };
  },

  testing(state, action) {
    return {
      testing: 'is working'
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

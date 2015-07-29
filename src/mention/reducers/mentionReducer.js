import _ from 'lodash-node';

const initialState = {
  editor: null,
  users: ['chris']
};

const actionsMap = {

  setEditor(state, action) {
    return {
      editor: action.payload.editor
    };
  },

  fetchUsers() {
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

  testing() {
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

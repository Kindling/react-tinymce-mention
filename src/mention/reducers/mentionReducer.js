import _ from 'lodash-node';

const initialState = {
  editor: null,
  highlightIndex: 0,
  users: [
    'chris',
    'bill',
    'john',
    'hey'
  ]
};

const actionsMap = {

  moveDown(state) {
    const { highlightIndex, users } = state;

    return {
      highlightIndex: highlightIndex < users.length - 1
        ? highlightIndex + 1
        : 0
    };
  },

  moveUp(state) {
    const { highlightIndex, users } = state;

    return {
      highlightIndex: highlightIndex > 0
        ? highlightIndex - 1
        : users.length - 1
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

  setEditor(state, action) {
    return {
      editor: action.payload.editor
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

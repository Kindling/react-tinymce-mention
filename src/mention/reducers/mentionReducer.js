import _ from 'lodash-node';

const initialState = {
  editor: null,
  highlightIndex: 0,
  query: '',
  selectedUser: null,
  allUsers: [
    'chris',
    'christina',
    'jim',
    'joseph',
    'katy',
    'kathrine'
  ],
  users: [
    'chris',
    'christina',
    'jim',
    'joseph',
    'katy',
    'kathrine'
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

  fetch(state) {
    const users = !_.isEmpty(state.users)
      ? state.users
      : [
        'jim',
        'alex',
        'chris',
        'katy',
        'sam'
      ];

    return {
      users
    };
  },

  query(state, action) {
    const prevQuery = state.query;
    const { query, aggrigate } = action.payload;

    // If override, skip character aggrigate
    const newQuery = aggrigate ? prevQuery + query : query;

    const users = state.allUsers.filter(user => {
      return !_.isEmpty(newQuery)
        ? user.includes(newQuery)
        : true;
    });

    return {
      query: newQuery,
      users
    };
  },

  resetQuery(state) {
    // console.log('resetting');
    // return {
    //   query: '',
    //   users: state.allUsers
    // };
  },

  select(state) {
    const { users, highlightIndex } = state;
    const selectedUser = users[highlightIndex];

    return {
      selectedUser,
      users: _.without(state.users, selectedUser)
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

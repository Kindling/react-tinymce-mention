import _ from 'lodash-node';

const initialState = {
  editor: null,
  highlightIndex: 0,
  mentions: [],
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

  query(state, action) {
    const prevQuery = state.query;
    const { query, aggrigate } = action.payload;

    const newQuery = (aggrigate ? prevQuery + query : query).toLowerCase();

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
    return {
      query: '',
      users: state.allUsers
    };
  },

  select(state) {
    const { mentions, users, highlightIndex } = state;
    const selectedUser = users[highlightIndex];

    return {
      selectedUser,
      mentions: state.mentions.push(selectedUser),
      users: _.without(state.users, selectedUser)
    };
  },

  setEditor(state, action) {
    return {
      editor: action.payload.editor
    };
  }
};

export default function mentionReducer(state = initialState, action) {
  const reduceFn = actionsMap[_.camelCase(action.type)];

  if (!reduceFn) {
    return state;
  }

  return {
    ...state,
    ...reduceFn(state, action)
  };
}

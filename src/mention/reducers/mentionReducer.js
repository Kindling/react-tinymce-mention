import _ from 'lodash-node';

export const initialState = {
  dataSource: [],
  editor: null,
  highlightIndex: 0,
  matchedSources: [],
  mentions: [],
  query: '',
  selectedItem: null
};

const actionsMap = {

  moveDown(state) {
    const { highlightIndex, dataSource } = state;

    return {
      highlightIndex: highlightIndex < dataSource.length - 1
        ? highlightIndex + 1
        : 0
    };
  },

  moveUp(state) {
    const { highlightIndex, dataSource } = state;

    return {
      highlightIndex: highlightIndex > 0
        ? highlightIndex - 1
        : dataSource.length - 1
    };
  },

  query(state, action) {
    const prevQuery = state.query;
    const { query } = action.payload;

    // Check to see if we're typing in the editor or backspacing
    // out from a previous @mention, which will regex over the
    // string looking for the last iteration of an @.  If single,
    // aggregate the previous result to build up a match; if
    // multiple, simply use that.
    const newQuery = (query.length > 1 ? query : prevQuery + query).toLowerCase();

    const matchedSources = state.dataSource.filter(source => {
      return source.includes(newQuery);
    });

    return {
      query: newQuery,
      matchedSources
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

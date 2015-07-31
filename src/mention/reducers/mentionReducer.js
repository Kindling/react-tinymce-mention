import _ from 'lodash-node';
import invariant from 'invariant';

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
    const { highlightIndex, matchedSources } = state;
    const len = matchedSources.length;
    var newIndex;

    invariant(matchedSources.length,
      'Error moving up: `matchedSources` cannot be empty or undefined'
    );

    if (highlightIndex < len - 1) {
      newIndex = highlightIndex + 1;
    } else {
      newIndex = 0;
    }

    return {
      highlightIndex: newIndex
    };
  },

  moveUp(state) {
    const { highlightIndex, matchedSources } = state;

    invariant(matchedSources.length,
      'Error moving up: `matchedSources` cannot be empty or undefined'
    );

    const len = matchedSources.length;
    var newIndex;

    if (highlightIndex > 0) {
      newIndex = highlightIndex - 1;
    } else {
      newIndex = len - 1;
    }

    return {
      highlightIndex: newIndex
    };
  },

  query(state, action) {
    const prevQuery = state.query;
    const { query } = action.payload;
    const len = query.length;

    // Check to see if we're typing in the editor or backspacing
    // out from a previous @mention, which will regex over the
    // string looking for the last iteration of an @.  If single,
    // aggregate the previous result to build up a match; if
    // multiple, simply use that.
    const newQuery = (len > 1 || len === 0 ? query : prevQuery + query).toLowerCase();

    const matchedSources = state.dataSource.filter(source => {
      if(!_.isEmpty(query)) {
        return source.includes(newQuery);
      } else {
        return false;
      }
    });

    return {
      query: newQuery,
      matchedSources
    };
  },

  resetQuery() {
    return {
      query: '',
      matchedSources: []
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

import without from 'lodash.without';
import cloneDeep from 'lodash.clonedeep';
import camelCase from 'lodash.camelcase';
import last from '../utils/last';

export const initialState = {
  dataSource: [],
  highlightIndex: 0,
  matchedSources: [],
  mentions: [],
  query: ''
};

function filterMentions(state, mention) {
  const foundMentions = state.mentions.filter(source => {
    return source && source.includes(mention);
  });

  return foundMentions;
}

const actionsMap = {

  finalizeSetup(state, action) {
    const { editor, dataSource } = action.payload;

    return {
      editor,
      dataSource
    };
  },

  moveDown(state) {
    const { highlightIndex, matchedSources } = state;
    const len = matchedSources && matchedSources.length;
    var newIndex;

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

    // Check to see if we're typing in a sequence of characters or
    // querying by an entire word.  Build up if the former.
    const newQuery = (len > 1 || len === 0 ? query : prevQuery + query).toLowerCase();

    const matchedSources = state.dataSource.filter(source => {
      if(query.length) {
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

  remove(state, action) {
    const mentions = state.mentions;
    const mention = action.payload.mention;

    if (!mentions || mentions === []) {
      return {};
    }

    const foundMention = last(filterMentions(state, mention));
    const updatedMentions = without(mentions, foundMention);

    return {
      matchedSources: [],
      mentions: updatedMentions
    };
  },

  resetMentions() {
    return {
      query: '',
      matchedSources: [],
      mentions: []
    };
  },

  resetQuery() {
    return {
      query: '',
      matchedSources: []
    };
  },

  select(state) {
    const { mentions, matchedSources, highlightIndex } = state;

    if (!matchedSources || matchedSources === []) {
      return {};
    }

    const selectedItem = matchedSources[highlightIndex];
    const updatedMentions = cloneDeep(mentions).concat([selectedItem]);

    return {
      highlightIndex: 0,
      matchedSources: [],
      mentions: updatedMentions,
      selectedItem
    };
  }
};

export default function mentionReducer(state = initialState, action) {
  const reduceFn = actionsMap[camelCase(action.type)];

  if (!reduceFn) {
    return state;
  }

  return {
    ...state,
    ...reduceFn(state, action)
  };
}

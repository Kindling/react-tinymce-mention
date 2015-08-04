import _ from 'lodash-node';
import invariant from 'invariant';

export const initialState = {
  dataSource: [],
  highlightIndex: 0,
  matchedSources: [],
  mentions: [],
  query: ''
};

function filterMentions(state, mention) {
  const foundMentions = state.mentions.filter(source => {
    return source.includes(mention);
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

    console.error(newQuery);
    // console.log(matchedSources);

    return {
      query: newQuery,
      matchedSources
    };
  },

  remove(state, action) {
    const mentions = state.mentions;
    const match = action.payload.match;

    if (!mentions.length) {
      return { mentions };
    }

    const foundMention = _.last(filterMentions(state, match));
    const updatedMentions = _.without(mentions, foundMention);

    return {
      mentions: updatedMentions
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

    invariant(matchedSources && matchedSources.length,
      'Error selecting item: `matchedSources` is emtpy.'
    );

    const selectedItem = matchedSources[highlightIndex];
    const updatedMentions = _.cloneDeep(mentions);
    updatedMentions.push(selectedItem);

    return {
      selectedItem,
      mentions: updatedMentions,
      matchedSources: _.without(matchedSources, selectedItem)
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

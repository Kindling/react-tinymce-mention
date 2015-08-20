import without from 'lodash.without';
import cloneDeep from 'lodash.clonedeep';
import camelCase from 'lodash.camelcase';
import last from '../utils/last';
import uid from '../utils/uid';

export const initialState = {
  dataSource: [],
  highlightIndex: 0,
  matchedSources: [],
  mentions: [],
  query: ''
};

const actionsMap = {

  finalizeSetup(state, action) {
    const { editor, dataSource } = action.payload;

    return {
      editor,
      dataSource,
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
      if (query.length) {
        let noSpaceQuery = newQuery.replace(/\s/g, '');

        return source.searchKey
          .toLowerCase()
          .replace(/\s/g, '')
          .includes(noSpaceQuery);
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

    // Remove mention from internal collection of current mentions
    const foundMention = last(mentions.filter(source => {
      const { displayLabel } = source;
      return displayLabel && displayLabel
        .toLowerCase()
        .includes(mention.toLowerCase());
    }));

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

  select(state, action) {
    const { mentions, matchedSources, highlightIndex } = state;
    const { payload } = action;

    if (!matchedSources || !matchedSources.length) {
      return {};
    }

    const selectIndex = payload && payload.index
      ? payload.index
      : highlightIndex;

    const updatedMentions = cloneDeep(mentions).concat([{
      ...matchedSources[selectIndex],
      tinymceId: uid('mention-'),
    }]);

    return {
      highlightIndex: 0,
      matchedSources: [],
      mentions: updatedMentions
    };
  },

  syncEditorState(state, action) {
    const editorMentionIds = action.payload.mentionIds;

    const filteredMentions = state.mentions.filter(mention => {
      return editorMentionIds.some(id => id === mention.tinymceId);
    });

    return filteredMentions.length
      ? { mentions: filteredMentions }
      : {};
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

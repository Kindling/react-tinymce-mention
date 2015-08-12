'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = mentionReducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashWithout = require('lodash.without');

var _lodashWithout2 = _interopRequireDefault(_lodashWithout);

var _lodashClonedeep = require('lodash.clonedeep');

var _lodashClonedeep2 = _interopRequireDefault(_lodashClonedeep);

var _lodashCamelcase = require('lodash.camelcase');

var _lodashCamelcase2 = _interopRequireDefault(_lodashCamelcase);

var _mentionUtilsLast = require('mention/utils/last');

var _mentionUtilsLast2 = _interopRequireDefault(_mentionUtilsLast);

var initialState = {
  dataSource: [],
  highlightIndex: 0,
  matchedSources: [],
  mentions: [],
  query: ''
};

exports.initialState = initialState;
function filterMentions(state, mention) {
  var foundMentions = state.mentions.filter(function (source) {
    return source && source.includes(mention);
  });

  return foundMentions;
}

var actionsMap = {

  finalizeSetup: function finalizeSetup(state, action) {
    var _action$payload = action.payload;
    var editor = _action$payload.editor;
    var dataSource = _action$payload.dataSource;

    return {
      editor: editor,
      dataSource: dataSource
    };
  },

  moveDown: function moveDown(state) {
    var highlightIndex = state.highlightIndex;
    var matchedSources = state.matchedSources;

    var len = matchedSources && matchedSources.length;
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

  moveUp: function moveUp(state) {
    var highlightIndex = state.highlightIndex;
    var matchedSources = state.matchedSources;

    var len = matchedSources.length;
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

  query: function query(state, action) {
    var prevQuery = state.query;
    var query = action.payload.query;

    var len = query.length;

    // Check to see if we're typing in a sequence of characters or
    // querying by an entire word.  Build up if the former.
    var newQuery = (len > 1 || len === 0 ? query : prevQuery + query).toLowerCase();

    var matchedSources = state.dataSource.filter(function (source) {
      if (query.length) {
        return source.includes(newQuery);
      } else {
        return false;
      }
    });

    return {
      query: newQuery,
      matchedSources: matchedSources
    };
  },

  remove: function remove(state, action) {
    var mentions = state.mentions;
    var mention = action.payload.mention;

    if (!mentions || mentions === []) {
      return {};
    }

    var foundMention = (0, _mentionUtilsLast2['default'])(filterMentions(state, mention));
    var updatedMentions = (0, _lodashWithout2['default'])(mentions, foundMention);

    return {
      matchedSources: [],
      mentions: updatedMentions
    };
  },

  resetMentions: function resetMentions() {
    return {
      query: '',
      matchedSources: [],
      mentions: []
    };
  },

  resetQuery: function resetQuery() {
    return {
      query: '',
      matchedSources: []
    };
  },

  select: function select(state) {
    var mentions = state.mentions;
    var matchedSources = state.matchedSources;
    var highlightIndex = state.highlightIndex;

    if (!matchedSources || matchedSources === []) {
      return {};
    }

    var selectedItem = matchedSources[highlightIndex];
    var updatedMentions = (0, _lodashClonedeep2['default'])(mentions).concat([selectedItem]);

    return {
      highlightIndex: 0,
      matchedSources: [],
      mentions: updatedMentions,
      selectedItem: selectedItem
    };
  }
};

function mentionReducer(state, action) {
  if (state === undefined) state = initialState;

  var reduceFn = actionsMap[(0, _lodashCamelcase2['default'])(action.type)];

  if (!reduceFn) {
    return state;
  }

  return _extends({}, state, reduceFn(state, action));
}
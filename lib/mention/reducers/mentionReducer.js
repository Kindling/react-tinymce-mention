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

var _utilsLast = require('../utils/last');

var _utilsLast2 = _interopRequireDefault(_utilsLast);

var _utilsUid = require('../utils/uid');

var _utilsUid2 = _interopRequireDefault(_utilsUid);

var initialState = {
  asyncDataSource: false,
  dataSource: [],
  highlightIndex: 0,
  matchedSources: [],
  mentions: [],
  query: ''
};

exports.initialState = initialState;
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

  loading: function loading(state, action) {
    var loading = action.payload.loading;

    return {
      loading: loading
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
    var query = action.payload.query.toUpperCase();
    var mentions = state.mentions;

    var dataSource = state.asyncDataSource ? action.payload.dataSource : state.dataSource;

    var matchedSources = dataSource.filter(function (source) {
      if (query.length) {
        var noSpaceQuery = query.replace(/\s/g, '');

        return source.searchKey.toUpperCase().replace(/\s/g, '').includes(noSpaceQuery);
      } else {
        return false;
      }
    });

    var withoutCurrentMentions = matchedSources.filter(function (source) {
      return !mentions.some(function (mention) {
        return mention.searchKey === source.searchKey;
      });
    });

    return {
      dataSource: dataSource,
      highlightIndex: 0,
      loading: false,
      matchedSources: withoutCurrentMentions,
      query: query
    };
  },

  remove: function remove(state, action) {
    var mentions = state.mentions;
    var mention = action.payload.mention;

    if (!mentions || mentions === []) {
      return {};
    }

    var foundMention = (0, _utilsLast2['default'])(mentions.filter(function (source) {
      var displayLabel = source.displayLabel;

      return displayLabel && displayLabel.toUpperCase().includes(mention.toUpperCase());
    }));

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

  select: function select(state, action) {
    var mentions = state.mentions;
    var matchedSources = state.matchedSources;
    var highlightIndex = state.highlightIndex;
    var payload = action.payload;

    if (!matchedSources || !matchedSources.length) {
      return {};
    }

    var selectIndex = payload && payload.index ? payload.index : highlightIndex;

    var updatedMentions = (0, _lodashClonedeep2['default'])(mentions).concat([_extends({}, matchedSources[selectIndex], {
      tinymceId: (0, _utilsUid2['default'])('mention-')
    })]);

    return {
      matchedSources: [],
      mentions: updatedMentions
    };
  },

  syncEditorState: function syncEditorState(state, action) {
    var editorMentionIds = action.payload.mentionIds;

    var filteredMentions = state.mentions.filter(function (mention) {
      return editorMentionIds.some(function (id) {
        return id === mention.tinymceId;
      });
    });

    return filteredMentions.length ? { mentions: filteredMentions } : { mentions: [] };
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
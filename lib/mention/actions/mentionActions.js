'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.finalizeSetup = finalizeSetup;
exports.fetching = fetching;
exports.moveDown = moveDown;
exports.moveUp = moveUp;
exports.query = query;
exports.remove = remove;
exports.resetMentions = resetMentions;
exports.resetQuery = resetQuery;
exports.select = select;
exports.syncEditorState = syncEditorState;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _constantsMentionActionTypes = require('../constants/MentionActionTypes');

var Types = _interopRequireWildcard(_constantsMentionActionTypes);

var _utilsInputValid = require('../utils/inputValid');

var _utilsInputValid2 = _interopRequireDefault(_utilsInputValid);

function finalizeSetup(editor, dataSource) {
  return {
    type: Types.FINALIZE_SETUP,
    payload: {
      editor: editor,
      dataSource: dataSource
    }
  };
}

function fetching(isFetching) {
  return {
    type: Types.FETCHING,
    payload: {
      fetching: isFetching
    }
  };
}

function moveDown() {
  return {
    type: Types.MOVE_DOWN
  };
}

function moveUp() {
  return {
    type: Types.MOVE_UP
  };
}

function query(input) {
  return function (dispatch, getState) {
    var asyncDataSource = getState().mention.asyncDataSource;

    if (asyncDataSource && (0, _utilsInputValid2['default'])(input)) {
      dispatch(fetching(true));

      asyncDataSource(input).then(function (response) {
        dispatch({
          type: Types.QUERY,
          payload: {
            dataSource: response,
            loading: false,
            query: input
          }
        });
      });
    } else {
      dispatch({
        type: Types.QUERY,
        payload: {
          query: input,
          dataSource: []
        }
      });
    }
  };
}

function remove(mention) {
  return {
    type: Types.REMOVE,
    payload: {
      mention: mention
    }
  };
}

function resetMentions() {
  return {
    type: Types.RESET_MENTIONS
  };
}

function resetQuery() {
  return {
    type: Types.RESET_QUERY
  };
}

function select(index) {
  return {
    type: Types.SELECT,
    payload: {
      index: index
    }
  };
}

function syncEditorState(mentionIds) {
  return {
    type: Types.SYNC_EDITOR_STATE,
    payload: {
      mentionIds: mentionIds
    }
  };
}
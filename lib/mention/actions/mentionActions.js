'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.finalizeSetup = finalizeSetup;
exports.moveDown = moveDown;
exports.moveUp = moveUp;
exports.query = query;
exports.remove = remove;
exports.resetMentions = resetMentions;
exports.resetQuery = resetQuery;
exports.select = select;
exports.syncEditorState = syncEditorState;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _constantsMentionActionTypes = require('../constants/MentionActionTypes');

var Types = _interopRequireWildcard(_constantsMentionActionTypes);

function finalizeSetup(editor, dataSource) {
  return {
    type: Types.FINALIZE_SETUP,
    payload: {
      editor: editor,
      dataSource: dataSource
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

    if (asyncDataSource) {
      asyncDataSource(input).then(function (response) {
        dispatch({
          type: Types.QUERY,
          payload: {
            query: input,
            dataSource: response
          }
        });
      });
    } else {
      dispatch({
        type: Types.QUERY,
        payload: {
          query: input
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
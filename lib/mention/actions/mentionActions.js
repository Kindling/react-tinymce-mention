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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _mentionConstantsMentionActionTypes = require('mention/constants/MentionActionTypes');

var Types = _interopRequireWildcard(_mentionConstantsMentionActionTypes);

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
  return {
    type: Types.QUERY,
    payload: {
      query: input
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

function select() {
  return {
    type: Types.SELECT
  };
}
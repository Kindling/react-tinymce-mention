import * as Types from 'mention/constants/MentionActionTypes';

export function moveDown() {
  return {
    type: Types.MOVE_DOWN
  };
}

export function moveUp() {
  return {
    type: Types.MOVE_UP
  };
}

export function fetchUsers() {
  return {
    type: Types.FETCH_USERS
  };
}

export function selectItem() {
  return {
    type: Types.SELECT
  };
}

export function setEditor(editor) {
  return {
    type: Types.SET_EDITOR,
    payload: {
      editor: editor
    }
  };
}

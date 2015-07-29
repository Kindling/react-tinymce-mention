import * as Types from 'mention/constants/MentionActionTypes';

export function setEditor(editor) {
  return {
    type: Types.SET_EDITOR,
    payload: {
      editor: editor
    }
  };
}

export function fetchUsers() {
  return {
    type: Types.FETCH_USERS
  };
}

export function testing() {
  return {
    type: Types.TESTING
  };
}

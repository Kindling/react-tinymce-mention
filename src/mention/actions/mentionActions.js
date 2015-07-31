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

export function fetch() {
  return {
    type: Types.FETCH
  };
}

export function query(character, { aggrigate = true } = {}) {
  return {
    type: Types.QUERY,
    payload: {
      query: character,
      aggrigate
    }
  };
}

export function resetQuery() {
  return {
    type: Types.RESET_QUERY
  };
}

export function select() {
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

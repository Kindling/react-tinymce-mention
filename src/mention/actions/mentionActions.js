import * as Types from 'mention/constants/MentionActionTypes';

export function fetch() {
  return {
    type: Types.FETCH
  };
}

export function finalizeSetup(editor, dataSource) {
  return {
    type: Types.FINALIZE_SETUP,
    payload: {
      editor,
      dataSource
    }
  };
}

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

export function query(input) {
  return {
    type: Types.QUERY,
    payload: {
      query: input
    }
  };
}

export function remove(match) {
  return {
    type: Types.REMOVE,
    payload: {
      match
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

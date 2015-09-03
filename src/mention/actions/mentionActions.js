import * as Types from '../constants/MentionActionTypes';

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
  return (dispatch, getState) => {
    const { asyncDataSource } = getState().mention;

    if (asyncDataSource) {
      asyncDataSource(input).then((response) => {
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

export function remove(mention) {
  return {
    type: Types.REMOVE,
    payload: {
      mention
    }
  };
}

export function resetMentions() {
  return {
    type: Types.RESET_MENTIONS
  };
}

export function resetQuery() {
  return {
    type: Types.RESET_QUERY
  };
}

export function select(index) {
  return {
    type: Types.SELECT,
    payload: {
      index
    }
  };
}

export function syncEditorState(mentionIds) {
  return {
    type: Types.SYNC_EDITOR_STATE,
    payload: {
      mentionIds
    }
  };
}

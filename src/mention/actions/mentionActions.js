import * as Types from '../constants/MentionActionTypes';
import inputValid from '../utils/inputValid';

export function finalizeSetup(editor, dataSource) {
  return {
    type: Types.FINALIZE_SETUP,
    payload: {
      editor,
      dataSource
    }
  };
}

export function loading(isLoading) {
  return {
    type: Types.LOADING,
    payload: {
      loading: isLoading
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

    if (asyncDataSource && inputValid(input)) {
      dispatch(loading(true));

      asyncDataSource(input).then((response) => {
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

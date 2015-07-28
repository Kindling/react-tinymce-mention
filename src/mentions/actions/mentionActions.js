import * as Types from 'mentions/constants/MentionActionTypes';

export function fetchUsers() {
  return {
    type: Types.FETCH_USERS
  };
}

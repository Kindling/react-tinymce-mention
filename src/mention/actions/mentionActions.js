import * as Types from 'mention/constants/MentionActionTypes';

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

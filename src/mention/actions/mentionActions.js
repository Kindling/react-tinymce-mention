import * as Types from 'mention/constants/MentionsActionTypes';

export function fetchUsers() {
  return {
    type: Types.FETCH_USERS
  };
}

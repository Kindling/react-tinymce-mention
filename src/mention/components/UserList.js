import _ from 'lodash-node';
import React from 'react';
import UserItem from 'mention/components/UserItem.js';

export default class UserList {
  render() {
    return (
      <ul>
        { _.time(4, () => {
          return (
            <UserItem />
          );
        })}
      </ul>
    );
  }
}

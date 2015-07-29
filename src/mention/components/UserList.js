import _ from 'lodash-node';
import React from 'react';
import { connect } from 'react-redux';
import UserItem from 'mention/components/UserItem.js';

@connect(state => ({
  users: state.mention.users
}))
export default class UserList {

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.users, this.props.users);
  }

  render() {
    const { users } = this.props;

    return (
      <ul>
        { users.map((user, index) => {
          return (
            <UserItem
              user={user}
              key={`user-${index}`}
            />
          );
        })}
      </ul>
    );
  }
}

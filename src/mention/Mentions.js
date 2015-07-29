import React from 'react';
import { connect } from 'react-redux';
import UserList from 'mention/components/UserList';

@connect(state => {
  return {
    editor: state.mention.editor,
    users: state.mention.users
  };
})
export default class Mentions {

  render() {
    return (
      <UserList />
    );
  }
}
